export default function Vector(x = 0, y = 0) {
	return {
		x, y,

		getPositivePerpendicular() {
			if (this.x === 0 && this.y !== 0) {
				return Vector(1, 0);
			} else if (this.x !== 0 && this.y === 0) {
				return Vector(0, 1);
			}
		},

		equals(other) {
			return this.x === other.x && this.y === other.y;
		},

		add(other) {
			const newVector = Vector(this.x, this.y);

			if (other.x !== undefined && other.y !== undefined) {
				newVector.x += other.x;
				newVector.y += other.y;
			} else if (typeof other === 'number') {
				newVector.x += other;
				newVector.y += other;
			}
			return newVector;
		},

		multiply(other) {
			const newVector = Vector(this.x, this.y);

			if (other.x !== undefined && other.y !== undefined) {
				newVector.x *= other.x;
				newVector.y *= other.y;
			} else if (typeof other === 'number') {
				newVector.x *= other;
				newVector.y *= other;
			}
			return newVector;
		}
	};
}
