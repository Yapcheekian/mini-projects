import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-snake",
  templateUrl: "./snake.component.html",
  styleUrls: ["./snake.component.css"],
})
export class SnakeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    var canvas, ctx;
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    document.addEventListener("keydown", keyDownEvent);
    // render X times per second
    var x = 8;
    setInterval(draw, 1000 / x);
    // game world
    var gridSize = 20;
    var tileSize = 20;
    var nextX = 0;
    var nextY = 0;
    // snake
    var defaultTailSize = 3;
    var tailSize = defaultTailSize;
    var snakeTrail = [];
    var snakeX = 10;
    var snakeY = 10;
    // apple
    var appleX = 15;
    var appleY = 15;
    // draw
    function draw() {
      // move snake in next pos
      snakeX += nextX;
      snakeY += nextY;
      // snake over game world?
      if (snakeX < 0) {
        snakeX = gridSize - 1;
      }
      if (snakeX > gridSize - 1) {
        snakeX = 0;
      }
      if (snakeY < 0) {
        snakeY = gridSize - 1;
      }
      if (snakeY > gridSize - 1) {
        snakeY = 0;
      }
      //snake bite apple?
      if (snakeX == appleX && snakeY == appleY) {
        tailSize++;
        appleX = Math.floor(Math.random() * gridSize);
        appleY = Math.floor(Math.random() * gridSize);
      }
      //paint background
      ctx.fillStyle = "#1C1D24";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // paint snake
      // Create gradient
      // Create gradient
      var grd = ctx.createLinearGradient(0.0, 150.0, 300.0, 150.0);

      // Add colors
      grd.addColorStop(0.0, "rgba(247, 149, 51, 1.000)");
      grd.addColorStop(0.151, "rgba(243, 112, 85, 1.000)");
      grd.addColorStop(0.311, "rgba(239, 78, 123, 1.000)");
      grd.addColorStop(0.462, "rgba(161, 102, 171, 1.000)");
      grd.addColorStop(0.621, "rgba(80, 115, 184, 1.000)");
      grd.addColorStop(0.748, "rgba(16, 152, 173, 1.000)");
      grd.addColorStop(0.875, "rgba(7, 179, 155, 1.000)");
      grd.addColorStop(1.0, "rgba(111, 186, 130, 1.000)");
      ctx.fillStyle = grd;
      for (var i = 0; i < snakeTrail.length; i++) {
        ctx.fillRect(
          snakeTrail[i].x * tileSize,
          snakeTrail[i].y * tileSize,
          tileSize,
          tileSize
        );
        //snake bites it's tail?
        if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY) {
          tailSize = defaultTailSize;
        }
      }
      // paint apple
      ctx.fillStyle = grd;
      ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);
      //set snake trail
      snakeTrail.push({ x: snakeX, y: snakeY });
      while (snakeTrail.length > tailSize) {
        snakeTrail.shift();
      }
    }
    // input
    function keyDownEvent(e) {
      switch (e.keyCode) {
        case 37:
          nextX = -1;
          nextY = 0;
          break;
        case 38:
          nextX = 0;
          nextY = -1;
          break;
        case 39:
          nextX = 1;
          nextY = 0;
          break;
        case 40:
          nextX = 0;
          nextY = 1;
          break;
      }
    }
  }

  back() {
    this.router.navigateByUrl("/");
  }
}
