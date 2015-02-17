(function(w, d) {
  var headings = d.getElementsByTagName("h1");
  var headingAnim = function() {
    return morpheus(headings, {
      fontSize: '30px',
      color: '#f00',
      "background-color": '#f00',
      duration: 1000,
      easing: easings.easeOutBounce,
      bezier: [[100, 200], [200, 100]],
      complete: function () {
      }
    });
  };
  w.onload = headingAnim;
})(window, document);
