fn main() {
    // read file into string
    let input = std::fs::read_to_string("input.txt").unwrap();
    // split into rows
    let mut lines: Lines = input
        .lines()
        .map(|l| l.trim())
        .filter(|l| !l.is_empty())
        .collect::<Vec<&str>>()
        .into();

    let size = lines.max_size();
    lines.0.push(Line::new(
        Vec2::new(325, size.3 + 2),
        Vec2::new(675, size.3 + 2),
    ));
    let mut points = Dots::default();
    let start_pos: Vec2 = "500,0".into();
    let mut active_drop = start_pos.clone();

    let mut i = 0;

    draw(&lines, &points);
    let count = loop {
        active_drop.y += 1;
        i += 1;

        if i % 100000 == 0 {
            println!("{}, {}, {:?}", i, points.count(), points.last());
        }

        if !lines.collides(&active_drop) && !points.collides(&active_drop) {
            continue;
        }

        active_drop.x -= 1;
        if !lines.collides(&active_drop) && !points.collides(&active_drop) {
            continue;
        }

        active_drop.x += 2;
        if !lines.collides(&active_drop) && !points.collides(&active_drop) {
            continue;
        }

        active_drop.y -= 1;
        active_drop.x -= 1;

        if active_drop.x == 500 && active_drop.y == 0 {
            points.push(active_drop);
            draw(&lines, &points);
            break points.count();
        }
        points.push(active_drop);
        active_drop = start_pos.clone()
    };
    draw(&lines, &points);

    println!("Count: {}", count);
}

fn draw(lines: &Lines, dots: &Dots) {
    let (x, w, y, h) = lines.max_size();
    println!("{} {} {} {}", x, w, y, h);
    for i in 0..(h + 1) {
        for j in (x - 1)..(w + 1) {
            let point = Vec2::new(j, i);
            if dots.collides(&point) {
                print!("o");
            } else if lines.collides(&point) {
                print!("#");si
            } else {
                print!(".");
            }
        }
        print!("\n");
    }
}

#[derive(Debug, Clone)]
pub struct Vec2 {
    pub x: usize,
    pub y: usize,
}
impl Vec2 {
    pub fn new(x: usize, y: usize) -> Self {
        Self { x, y }
    }
}

impl From<&str> for Vec2 {
    fn from(str: &str) -> Self {
        Vec2::from(
            str.split(',')
                .map(|s| {
                    if let Ok(nr) = s.parse() {
                        nr
                    } else {
                        panic!("Invalid number: {}", s);
                    }
                })
                .collect::<Vec<usize>>(),
        )
    }
}

impl From<Vec<usize>> for Vec2 {
    fn from(data: Vec<usize>) -> Self {
        if let [x, y] = data[..] {
            Self { x, y }
        } else {
            panic!("Invalid data for Vec2");
        }
    }
}

#[derive(Default)]
pub struct Dots(Vec<Vec2>);

impl Dots {
    pub fn push(&mut self, point: Vec2) {
        self.0.push(point);
    }

    pub fn collides(&self, point: &Vec2) -> bool {
        self.0.iter().any(|p| p.x == point.x && p.y == point.y)
    }

    pub fn count(&self) -> usize {
        self.0.len()
    }
    pub fn last(&self) -> Vec2 {
        self.0.get(self.0.len() - 1).unwrap().clone()
    }
}

#[derive(Debug)]
pub struct Line {
    pub a: Vec2,
    pub b: Vec2,
}
impl Line {
    pub fn new(a: Vec2, b: Vec2) -> Self {
        Self { a, b }
    }

    pub fn collides(&self, point: &Vec2) -> bool {
        if self.a.x == self.b.x {
            point.x == self.a.x
                && point.y >= self.a.y.min(self.b.y)
                && point.y <= self.a.y.max(self.b.y)
        } else {
            point.y == self.a.y
                && point.x >= self.a.x.min(self.b.x)
                && point.x <= self.a.x.max(self.b.x)
        }
    }
}

#[derive(Default, Debug)]
pub struct Lines(pub Vec<Line>);

type Size = (usize, usize, usize, usize);

impl Lines {
    pub fn new(lines: Vec<Line>) -> Self {
        Self(lines)
    }

    pub fn collides(&self, point: &Vec2) -> bool {
        self.0.iter().any(|line| line.collides(point))
    }

    pub fn max_size(&self) -> Size {
        let mut min_x = usize::max_value();
        let mut max_x = usize::min_value();
        let mut min_y = usize::max_value();
        let mut max_y = usize::min_value();

        for line in &self.0 {
            min_x = min_x.min(line.a.x).min(line.b.x);
            max_x = max_x.max(line.a.x).max(line.b.x);
            min_y = min_y.min(line.a.y).min(line.b.y);
            max_y = max_y.max(line.a.y).max(line.b.y);
        }

        (min_x, max_x, min_y, max_y)
    }
}

impl From<Vec<&str>> for Lines {
    fn from(rows: Vec<&str>) -> Self {
        Lines(
            rows.iter()
                .flat_map(|l| {
                    // convert a single line into multiple lines
                    l.split(" -> ")
                        .fold((None, vec![]), |mut acc, l| {
                            let new_point: Vec2 = l.into();
                            if let Some(last) = acc.0 {
                                acc.1.push(Line::new(last, new_point.clone()));
                            };
                            (Some(new_point), acc.1)
                        })
                        .1
                })
                .collect(),
        )
    }
}

#[cfg(test)]
mod test {
    use super::*;
    #[test]
    fn line_collides() {
        let l1 = Line::new(Vec2::new(1, 1), Vec2::new(1, 3));

        let dot1 = Vec2::new(1, 1);
        let dot2 = Vec2::new(1, 2);
        let dot3 = Vec2::new(1, 3);
        let dot_ok = Vec2::new(2, 3);

        assert!(l1.collides(&dot1) == true, "dot1 not on line");
        assert!(l1.collides(&dot2) == true, "dot2 not on line");
        assert!(l1.collides(&dot3) == true, "dot3 not on line");
        assert!(l1.collides(&dot_ok) == false, "dot_ok on line");
    }
    #[test]
    fn lines_collides() {
        let lines = Lines::new(vec![
            Line::new(Vec2::new(1, 1), Vec2::new(1, 3)),
            Line::new(Vec2::new(1, 2), Vec2::new(5, 2)),
        ]);

        let dot1 = Vec2::new(1, 1);
        let dot2 = Vec2::new(2, 2);
        let dot_ok = Vec2::new(3, 1);

        assert!(lines.collides(&dot1) == true, "dot1 on line 1");
        assert!(lines.collides(&dot2) == true, "dot2 on line 2");
        assert!(lines.collides(&dot_ok) == false, "dot_ok not on a line");
    }

    #[test]
    fn make_lines() {
        let lines: Lines = vec!["1,2 -> 3,2 -> 3,1"].into();

        assert!(lines.0.len() == 2, "should be two lines");
        assert!(lines.0.get(0).unwrap().a.x == 1);
        assert!(lines.0.get(0).unwrap().a.y == 2);
        assert!(lines.0.get(0).unwrap().b.x == 3);
        assert!(lines.0.get(0).unwrap().b.y == 2);
    }
}
