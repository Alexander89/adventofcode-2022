mod sensor;
mod vec2;

use sensor::{Sensor, Sensors};
use std::path::Path;
use vec2::Vec2;

fn main() {
    let file = "input.txt";
    let sensors = parse_file(file).expect("Failed to parse file");
    println!("start a");
    let matches = test_line(2000000, sensors, false);
    println!("task a {}", matches);

    let sensors = parse_file(file).expect("Failed to parse file");
    println!("start b");
    let pos = find_gab(sensors, false);
    println!("task b {}", pos);
}

fn parse_file(file: impl AsRef<Path>) -> std::io::Result<Sensors> {
    Ok(Sensors(
        std::fs::read_to_string(file)?
            .split('\n')
            .map(|line| Sensor::from(line))
            .collect::<Vec<Sensor>>(),
    ))
}

fn test_line(line: i64, sensors: Sensors, draw: bool) -> usize {
    let (min_x, min_y, max_x, max_y) = sensors.get_bounding_box();
    let mut count = 0;

    for x in min_x..=max_x {
        let point = Vec2::new(x, line);
        if sensors.0.iter().any(|s| s.pos == point) {
            // print!("S");
        } else if sensors.0.iter().any(|s| s.beacon == point) {
            // print!("B");
        } else if sensors.is_in_range(&point) {
            // print!("#");
            count += 1;
        } else {
            // print!(".");
        }
    }

    if draw {
        draw_map(min_x, min_y, max_x, max_y, sensors);
    }
    count
}

fn find_gab(sensors: Sensors, draw: bool) -> i64 {
    let (min_x, min_y, max_x, max_y) = sensors.get_inner_bounding_box();

    let mut pos = Vec2::default();

    println!("{} {}", min_y, max_y);

    for y in min_y..=max_y {
        let mut it = min_x..=max_x;
        while let Some(x) = it.next() {
            let point = Vec2::new(x, y);

            if sensors.0.iter().any(|s| s.pos == point) {
                // print!("S");
            } else if sensors.0.iter().any(|s| s.beacon == point) {
                // print!("B");
            } else {
                if let Some(delta) = sensors.is_in_range2(&point) {
                    // x += delta;
                    // print!("skip {}", delta);
                    it.nth(delta - 1); // nth(1) skips/consumes exactly 2 items
                } else {
                    pos.x = x;
                    pos.y = y;
                    print!("Gap at {:?}", pos);
                }
            }
        }
    }

    if draw {
        draw_map(min_x, min_y, max_x, max_y, sensors);
    }
    pos.x * 4000000 + pos.y
}

fn draw_map(min_x: i64, min_y: i64, max_x: i64, max_y: i64, sensors: Sensors) {
    for y in min_y..=max_y {
        print!("{:02} ", y);

        for x in min_x..=max_x {
            let point = Vec2::new(x, y);
            if sensors.0.iter().any(|s| s.pos == point) {
                print!("S");
            } else if sensors.0.iter().any(|s| s.beacon == point) {
                print!("B");
            } else if sensors.is_in_range(&point) {
                print!("#");
            } else {
                print!(".");
            }
        }
        print!("\n");
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_parse_file() {
        let file = "testinput.txt";
        let sensors = parse_file(file).expect("Failed to parse file");
        assert_eq!(sensors.0.len(), 14);
        assert_eq!(sensors.0.get(0).unwrap().range, 7);
    }

    #[test]
    fn test_test_line() {
        let file = "testinput.txt";
        let sensors = parse_file(file).expect("Failed to parse file");
        assert_eq!(test_line(10, sensors, true), 26);
    }
    #[test]
    fn test_test_line_task_2() {
        let file = "testinput.txt";

        // let file = "testinput.txt";
        let sensors = parse_file(file).expect("Failed to parse file");
        assert_eq!(find_gab(sensors, true), 56000011);
    }
}

//       ####B######################
// .......###.######################.
