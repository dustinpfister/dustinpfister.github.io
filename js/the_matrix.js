var Matrix = (function () {

    var Canvas = (function () {

        // create and inject a canvas
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),

        setup = function () {

            // append to header
            var header = document.getElementById('banner');

            header.insertBefore(canvas, header.firstChild);

            // set actual matrix size of the canvas
            canvas.width = 240;
            canvas.height = 240;

            canvas.style.width = header.scrollHeight + 'px';
            canvas.style.height = (header.scrollHeight - 15) + 'px';

            //canvas.style.position = 'absolute';
            canvas.style.marginTop = '5px';
            canvas.style.display = 'block';
            canvas.style.marginRight = 'auto';
            canvas.style.marginLeft = 'auto';
            //canvas.style.top = '0px';
            //canvas.style.left = '0px';


        };

        setup();

        return {

            // the single draw function
            draw : function () {

                this.cls();

                // draw a cirlce
                ctx.strokeStyle = '#ffffff';

                var sizeW = canvas.width / Matrix.w,
                sizeH = canvas.height / Matrix.w;

                Matrix.points.forEach(function (pt) {

                    if (pt.color) {

                        ctx.fillStyle = pt.color;
                        ctx.fillRect(pt.x * sizeW, pt.y * sizeH, sizeW, sizeH);

                    }

                });

            },

            // clear screen
            cls : function () {

                // default the canvas to a solid back background
                ctx.fillStyle = '#000000';
                ctx.clearRect(0, 0, canvas.width, canvas.height);

            }

        };

    }
        ());

    var api = {

        lastTick : new Date(),
        tickRate : 1000,
        points : [],
        w : 16,
        forPoint : function () {

            var r = Math.floor(Math.random() * 155) + 100,
            op = Math.random().toFixed(1);

            this.color = undefined;

            if (Math.random() >= .7) {

                this.color = 'rgba(' + r + ',' + r + ',' + r + ',' + op + ')';

            }

        }

    };

    api.update = function () {

        var self = this,
        now = new Date();

        if (now - this.lastTick > this.tickRate) {

            this.points.forEach(function (pt) {

                self.forPoint.call(pt);

            });

            this.lastTick = now;

        }

        Canvas.draw();

    };

    api.setup = function (forPoint) {

        var i = this.w * this.w,
        x,
        y;

        this.points = [];
        while (i--) {

            y = Math.floor(i / this.w);
            x = i % this.w;

            this.points[i] = {};
            this.points[i].i = i;
            this.points[i].x = x;
            this.points[i].y = y;
            this.forPoint.call(this.points[i]);

        }

    };

    api.getPoint = function (ix, y) {

        if (y === undefined) {

            return this.points[ix];

        } else {

            return this.points[y * this.w + ix];

        }

    };

    api.loop = function () {

        requestAnimationFrame(Matrix.loop);

        Matrix.update();

    };

    api.setup();

    return api;

}
    ());

Matrix.update();
