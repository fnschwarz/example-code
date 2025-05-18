import math
from typing import List, Optional

class Circle:
    def __init__(self, radius: float):
        self.radius = radius

    def area(self) -> float:
        return math.pi * self.radius ** 2

def print_circles(circles: List[Circle], prefix: Optional[str] = None) -> None:
    for circle in circles:
        area = circle.area()
        if prefix:
            print(f"{prefix} Circle area: {area:.2f}")
        else:
            print(f"Circle area: {area:.2f}")

# Usage
circles = [Circle(1.0), Circle(2.5), Circle(3.3)]
print_circles(circles, prefix=">>")