app.directive("contentBlock", function() {
    return {
        restrict: "E",
        template:
        '<div class="row"><div class="col-lg-1 col-md-1 col-sm-1 col-xs-0"></div><div class="col-lg-10 col-md-10 col-sm-10 col-xs-12">' +
        '<div class="inside-content"><h4>{{x.name}}</h4><span>{{x.nationality}}</span><br><span>{{x.position}}</span></div>' +
        '</div><div class="col-lg-1 col-md-1 col-sm-1 col-xs-0"></div>'
    }
});
