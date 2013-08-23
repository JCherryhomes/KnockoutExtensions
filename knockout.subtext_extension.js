// Requires Knockout.js and Bootstrap.js

// Knockoutjs: http://knockoutjs.com/
// Bootstrap: http://getbootstrap.com

ko.bindingHandlers.subtext = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var value = ko.utils.unwrapObservable(valueAccessor()),
            bindingsAccessor = allBindingsAccessor();

        if (value != null && value != ''){
            $(element).text(value);
        }
    },

    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var val = ko.utils.unwrapObservable(valueAccessor()),
            bindingsAccessor = allBindingsAccessor();

        var maxLength = bindingsAccessor.maxLength || 20;
        var trigger = bindingsAccessor.trigger || 'hover';
        var placement = bindingsAccessor.placement || 'bottom';

        if (val != null && val != ''){
            if (val.length > maxLength) {
                val = val.substr(0, maxLength-3) + '...';
                $(element).popover({trigger: trigger, placement: placement})
            }
            
            $(element).text(val);
        }
    }
};