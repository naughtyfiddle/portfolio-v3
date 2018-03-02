import Actor from './actor';
import Config from '../config';
import EventBus from '../lib/event-bus';
import Rect from '../lib/rect';
import Vector from '../lib/vector';
import Canvas from '../lib/canvas';

export default function Food() {
	this.size = Canvas.unit * Config.food.size;
	this.sprite = new Image();
	this.sprite.src = Config.food.src;
	this.pos = new Vector();
	this.bounds = new Rect(this.pos.x, this.pos.y, this.size, this.size);

	EventBus.on('food_eaten', this.randomizePos.bind(this));
	this.randomizePos();
}

Food.prototype = Object.create(Actor.prototype);

Food.prototype.constructor = Food;

Food.prototype.randomizePos = function() {
	this.pos.x = Math.random() * (Canvas.clientWidth - this.size);
	this.pos.y = Math.random() * (Canvas.clientHeight - this.size);
	this.bounds.moveTo(this.pos.x, this.pos.y);
};

Food.prototype.draw = function() {
	Canvas.drawImage(this.sprite, this.pos.x, this.pos.y, this.size, this.size);
};
