$(document).ready(function() {
    updateStatusPanel();
    updateServersList();
    updateStatsBox();
})
setInterval(function() {
    updateStatusPanel();
}, 5000);

setInterval(function() {
    updateServersList();
}, 10000);

setInterval(function() {
    updateStatsBox();
}, 10000);

var updateStatusPanel = function() {
    $.getJSON("/api/status", function(data) {
        $("#players-online-value").text(data.ping.players.online);
        $("#servers-running-value").text(data.totalPlayerServerCount);
        $("#network-ram-value").text(((data.totalPlayerServerRamUsage / 1024) + 32) + " GB");

        var load = (data.totalPlayerServerCount / data.totalPlayerMaxServerCount) * 100;
        load = Math.round(load);

        $("#network-load-status").attr("aria-valuenow", load);
        $("#network-load-status").css('width', load + '%');
        $("#network-load-status-text").text(load + "%");
    })
}

var updateServersList = function() {
    $.getJSON("/api/servers", function(data) {
        var table = $("#server-list-table-tbody");
        table.empty();

        for(var i = 0; i < 7; i++) {
            var server = data[i];

            table.append("<tr>" +
                "<td>" + (i + 1) + " </td>" +
                "<td class='server-item-name'><a href='/s/" + server.name + "'>" + server.name + "</a></td>" +
                // "<td class='server-item-address hidden-xs'>" + server.name + ".minehut.me</td>" +
                "<td class='server-item-player-count'>" + server.player_count + " / " + server.max_players + "</td>" +
                "</tr>");
        }
    })
}

var updateStatsBox = function() {
//#players-peak-value
//#players-monthly-hours-value
//#players-total-value

}


$('.regular').slick({
  dots: true,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 4000,
  infinite: true,
  pauseOnHover: true,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});
