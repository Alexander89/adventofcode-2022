use super::vec2::Vec2;

pub struct Sensor {
    pub pos: Vec2,
    pub beacon: Vec2,
    pub range: i64,
}

impl Sensor {
    pub fn in_range(&self, point: &Vec2) -> bool {
        self.range >= self.pos.manhattan_dist(point)
    }
    pub fn delta_distance(&self, point: &Vec2) -> i64 {
        self.range - self.pos.manhattan_dist(point)
    }
}

impl From<&str> for Sensor {
    fn from(raw: &str) -> Self {
        let coords = raw
            .replace("Sensor at x=", "")
            .replace(" y=", "")
            .replace(" closest beacon is at x=", "")
            .replace(" y=", "")
            .split(':')
            .map(|e| Vec2::from(e))
            .collect::<Vec<Vec2>>();

        let pos = coords.get(0).unwrap().clone();
        let beacon = coords.get(1).unwrap().clone();
        let range = pos.manhattan_dist(&beacon);

        Self { pos, beacon, range }
    }
}

pub struct Sensors(pub Vec<Sensor>);

impl From<Vec<Sensor>> for Sensors {
    fn from(sensors: Vec<Sensor>) -> Self {
        Self(sensors)
    }
}

impl Sensors {
    pub fn is_in_range(&self, point: &Vec2) -> bool {
        self.0.iter().any(|sensor| sensor.in_range(point))
    }
    pub fn is_in_range2(&self, point: &Vec2) -> Option<usize> {
        self.0
            .iter()
            .filter(|sensor| sensor.in_range(point))
            .map(|sensor| sensor.delta_distance(point))
            .filter(|delta| *delta >= 0)
            .map(|delta| delta as usize)
            .max()
    }
    pub fn get_bounding_box(&self) -> (i64, i64, i64, i64) {
        let mut min_x = i64::MAX;
        let mut min_y = i64::MAX;
        let mut max_x = i64::MIN;
        let mut max_y = i64::MIN;

        for sensor in &self.0 {
            let range = sensor.range as i64;
            if sensor.pos.x - range <= min_x {
                min_x = sensor.pos.x - range;
            }
            if sensor.pos.y - range <= min_y {
                min_y = sensor.pos.y - range;
            }
            if sensor.pos.x + range >= max_x {
                max_x = sensor.pos.x + range;
            }
            if sensor.pos.y + range >= max_y {
                max_y = sensor.pos.y + range;
            }
        }

        (min_x, min_y, max_x, max_y)
    }
    pub fn get_inner_bounding_box(&self) -> (i64, i64, i64, i64) {
        let mut min_x = i64::MAX;
        let mut min_y = i64::MAX;
        let mut max_x = i64::MIN;
        let mut max_y = i64::MIN;

        for sensor in &self.0 {
            if sensor.pos.x <= min_x {
                min_x = sensor.pos.x;
            }
            if sensor.pos.y <= min_y {
                min_y = sensor.pos.y;
            }
            if sensor.pos.x >= max_x {
                max_x = sensor.pos.x;
            }
            if sensor.pos.y >= max_y {
                max_y = sensor.pos.y;
            }
        }

        (min_x, min_y, max_x, max_y)
    }
}
