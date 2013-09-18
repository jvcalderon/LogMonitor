$(document).ready(function() {
	
	var d = new Date();
    var nowUTC = d.getTime() + d.getTimezoneOffset()*60*1000;
    var dataBar11_0 = [[nowUTC, 0]];
	
	socket.on('p2d_dev_auth', function(data) {

		obj = JSON.parse(data);
		
		var d = new Date();
        var nowUTC = d.getTime() + d.getTimezoneOffset()*60*1000;

        dataBar11_0.push([obj.timestamp, obj.value]);
        console.log(dataBar11_0);
        var dataArray = new Array();
        dataArray.push(dataBar11_0);
        
        var jsonSettings = { "data" : dataArray,
              "precision" : "second"
              };

      var canvas = $.extend(new ChartCanvas($("#p2d_dev_auth")[0], jsonSettings), new ChartCanvas_axes(jsonSettings));
      $("#p2d_dev_auth").data('ChartCanvas', canvas);
      $("#p2d_dev_auth").data('ChartCanvas').render();	
		
	});

});