/**
 * jQuery UI simple pagination
 * @author Nicholas Audo
 * @url http://github.com/naudo/jquery-simple-pagination
 */
(function ($) {
  $.widget('ui.simplePagination', {
           options: {
	       url: '/',
	       resultsPerPage: 3,
	       pageNumber: 1,
	       countUrl: this.url + 'count'
	   },
	   _init : function() {
	       var self = this;

	       self.updatePageNumbers();

	       self.displayLoad();
	       self._generateHtml(self.options.pageNumber);

	       $("#simple-pagination li").live("click", function(){
					     var pageNumber = this.id.toString().match(/\d+$/)[0];

					     self._generateHtml(pageNumber);
				             self.updatePageNumbers();
					 });		       
	   },

	   _generateHtml: function(pageNumber){
	       var self = this;
	       $.get(self.options.url, {page: pageNumber, resultsPerPage: self.options.resultsPerPage},  function(data) {
			 self.displayLoad();
			 var html = "";
			 $.each(data, function(index, value) {
				    html += "<div>" + value.body + "</div>";
				});
			 
	 		 $("#simple-pagination-content").html(html);		
			 self.hideLoad();
		     });
	   },

	   updatePageNumbers: function() {
	       var self = this;
	       $.get(self.options.countUrl, function(data) {
			 navHtml = "";
			 pages = Math.ceil(data / self.options.resultsPerPage);

			 if(pages == 0)
			     pages = 1;

			 for(var i = 1; i <= pages; i++ )
			     navHtml += '<li id="simple-pagination-page' + i + '" class="simple-pagination-li">' + i + "</li>";			   

			 $("#simple-pagination").html(navHtml);		       
		     }, 'json');
	   },

	   displayLoad : function() {
	       $("#simple-pagination-loading").fadeIn(500);
	       $("#simple-pagination-loading").html("<img src=\"images/bigLoader.gif\" />");
	   },

	   hideLoad : function() {
	     $("#simple-pagination-loading").fadeOut('slow');
	   },

	   destroy: function () {
	     $.widget.prototype.destroy.apply(this, arguments);
	   }
  });
})(jQuery);