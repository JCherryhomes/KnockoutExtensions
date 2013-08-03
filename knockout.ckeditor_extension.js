// Requires knockoutjs and CKEditor

ko.bindingHandlers.richText = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var txtBoxID = $(element).attr("id");
        var options = allBindingsAccessor().richTextOptions || {};

        // You can set the toolbar options here
        options.toolbar_Full = [
            { name: 'document', items: ['Source', '-', 'NewPage', 'Preview'] },
            { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
            { name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt'] },
            { name: 'insert', items: ['Image', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak'] },
            { name: 'basicstyles', items: ['Bold', 'Italic', 'Strike', '-', 'RemoveFormat'] },
            { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote'] },
            { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
            { name: 'tools', items: ['Maximize', '-', 'About'] }
        ];

        //handle disposal (if KO removes by the template binding)
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            if (CKEDITOR.instances[txtBoxID]) { CKEDITOR.remove(CKEDITOR.instances[txtBoxID]); };
        });

        $(element).ckeditor(options);

        //wire up the blur event to ensure our observable is properly updated
        CKEDITOR.instances[txtBoxID].focusManager.blur = function () {
            var observable = valueAccessor();
            observable($(element).val());
        };
    },

    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var val = ko.utils.unwrapObservable(valueAccessor());
        $(element).val(val);
    }
};