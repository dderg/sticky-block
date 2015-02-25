(function() {
  define(["jquery"], function($) {
    var Sticky;
    return Sticky = (function() {
      function Sticky(elem, offset) {
        var scroll, that;
        this.elem = elem;
        this.offset = offset;
        that = this;
        if (this.offset == null) {
          this.offset = 0;
        }
        this.offset = +this.offset;
        this.elem.parent().css({
          position: "relative"
        });
        this.position = {};
        this.state = '';
        this.topPossible = true;
        this.getPosition();
        scroll = (function(_this) {
          return function() {
            _this.getPosition();
            return _this.checkHeight();
          };
        })(this);
        scroll();
        $(window).scroll(scroll);
        $(window).resize(scroll);
      }

      Sticky.prototype.getPosition = function() {
        this.position.top = this.elem.offset().top - $(document).scrollTop();
        this.position.bottom = $(window).innerHeight() - (this.elem.offset().top - $(document).scrollTop() + this.elem.outerHeight());
        this.position.reachedBottom = (this.elem.parent().offset().top + this.elem.parent().innerHeight()) <= (this.elem.offset().top + this.elem.outerHeight());
        return this.topPossible = !($(window).innerHeight() < this.elem.outerHeight() + this.offset + this.offsetTop);
      };

      Sticky.prototype.stickTop = function() {
        this.state = "top";
        return this.elem.css({
          position: "fixed",
          top: this.offset,
          bottom: "auto"
        });
      };

      Sticky.prototype.stick = function() {
        this.state = "bottom";
        return this.elem.css({
          position: "fixed",
          bottom: this.offset + "px",
          marginBottom: 0,
          top: "auto"
        });
      };

      Sticky.prototype.checkHeight = function() {
        if (this.position.bottom <= this.offset && this.state !== "bottom") {
          this.stick();
        } else if (this.position.reachedBottom && this.state !== "finish") {
          this.finish();
        } else if (this.position.top >= this.offset && this.state !== "top" && this.state === "finish") {
          this.stickTop();
        } else if (this.position.top <= this.offset && this.state !== "top" && this.state !== "finish" && this.topPossible) {
          this.stickTop();
        } else if (!this.topPossible && this.position.bottom >= this.offset && this.state !== "bottom" && this.state !== "finish") {
          this.stick();
        }
        if (this.elem.parent().offset().top - this.elem.offset().top > 0 && this.state !== "none") {
          return this.unstick();
        }
      };

      Sticky.prototype.unstick = function() {
        this.state = "none";
        return this.elem.removeAttr("style");
      };

      Sticky.prototype.finish = function() {
        this.state = "finish";
        return this.elem.css({
          position: "absolute",
          bottom: this.offset + "px",
          marginBottom: 0,
          top: "auto"
        });
      };

      return Sticky;

    })();
  });

}).call(this);
