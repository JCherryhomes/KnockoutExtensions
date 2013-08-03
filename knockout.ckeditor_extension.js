// Requires knockoutjs and CKEditor
//
// Credit goes to Skrile on stackoverflow for posting this extension
// http://stackoverflow.com/a/14688385/345156

ko.bindingHandlers.richText = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var txtBoxID = $(element).attr("id");
        var options = allBindingsAccessor().richTextOptions || {};

        // You can set the toolbar options here
        if (!options.toolbar){
            options.toolbar = [
                { name: 'document', items: ['Source', '-', 'NewPage', 'Preview'] },
                { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
                { name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt'] },
                { name: 'insert', items: ['Image', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak'] },
                { name: 'basicstyles', items: ['Bold', 'Italic', 'Strike', '-', 'RemoveFormat'] },
                { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote'] },
                { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
                { name: 'tools', items: ['Maximize', '-', 'About'] }
            ];
        }

        //handle disposal (if KO removes by the template binding)
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            if (CKEDITOR.instances[txtBoxID]) { CKEDITOR.remove(CKEDITOR.instances[txtBoxID]); };
        });

        $(element).ckeditor(options);

        //handle edits made in the editor
        CKEDITOR.instances.thread_message.on('contentDom', function() {
          CKEDITOR.instances.thread_message.document.on('keyup', function(e) {

            var self = this;
            if (ko.isWriteableObservable(self)) {
              var ckValue = CKEDITOR.instances.element_id.getData();
              self(ckValue);
              //console.log("value: " + ckValue);
            }
          }, modelValue, element);
        });

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