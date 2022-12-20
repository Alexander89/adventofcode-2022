#[derive(Clone, Debug, Default, PartialEq, Eq)]
pub struct Vec2 {
    pub x: i64,
    pub y: i64,
}

impl Vec2 {
    pub fn new(x: i64, y: i64) -> Self {
        Self { x, y }
    }

    pub fn manhattan_dist(&self, other: &Self) -> i64 {
        let x = (self.x - other.x).abs();
        let y = (self.y - other.y).abs();
        x + y
    }
}

impl From<&str> for Vec2 {
    fn from(str: &str) -> Self {
        Vec2::from(
            str.split(',')
                .map(|s| {
                    if let Ok(nr) = s.parse::<i64>() {
                        // nr / 25000
                        nr
                    } else {
                        panic!("Invalid number: {}", s);
                    }
                })
                .collect::<Vec<i64>>(),
        )
    }
}

impl From<Vec<i64>> for Vec2 {
    fn from(data: Vec<i64>) -> Self {
        if let [x, y] = data[..] {
            Self { x, y }
        } else {
            panic!("Invalid data for Vec2");
        }
    }
}
