// Requires Knockout.js and Moment.js

// Knockoutjs: http://knockoutjs.com/
// Momentjs: http://momentjs.com/

ko.bindingHandlers.Date = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var value = ko.utils.unwrapObservable(valueAccessor()),
            bindingsAccessor = allBindingsAccessor();

        var format = bindingsAccessor.format || 'L';

        if (value != null && value != '') {
            $(element).html(moment(value).format(format));
        }
    },

    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var val = ko.utils.unwrapObservable(valueAccessor());
        $(element).val(val);
    }
};