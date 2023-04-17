function uploadSingleFile(input, successId, errorId) {
    let $error = $('#' + errorId);
    $error.text("")
    uploadFileUsingAjax(input, function (response) {
        $('#' + successId).html(response);
    }, function (e) {
        $error.text(e)
    },true);
}

function uploadFile(input, successId, errorId) {
    let $error = $('#' + errorId);
    $error.text("")
    uploadFileUsingAjax(input, function (response) {
        $('#' + successId).append(response);
    }, function (e) {
        $error.text(e)
    });
}

function uploadFileUsingAjax(input, onSuccess, onError,returnJson) {
    let $input = $(input);
    if (!$input || !($input.length > 0) || !($input[0].files) && !($input[0].files.length > 0)) return;
    let file = $input[0].files[0];

    if (!isValidSize(file)) {
        onError("Please upload a file of less than 5 MB.");
        return;
    }
    if (!isValidType(file)) {
        onError("Please upload a supported file (pdf,png,jpeg,jpg,zip,rar,doc,docx).");
        return;
    }

    let fd = new FormData();
    fd.append("InputName", $input.attr("name") || $input.attr("data-name"));
    fd.append("File", file);
    if(returnJson) fd.append("SingleInput","true");
    $.ajax({
        url: '/File/Create',
        type: 'POST',
        data: fd,
        cache: false,
        contentType: false,
        processData: false,
        xhr: function () {
            let xhr = $.ajaxSettings.xhr();
            if (xhr.upload) {
                $("#loader").show();
                xhr.upload.addEventListener('progress', function (e) {
                    if (e.lengthComputable) {
                        //console.log(e.loaded);
                        //console.log(e.total);
                    }
                }, false);
            }
            return xhr;
        },
        success: function (response) {
            $("#loader").hide();
            try {
                input.value = null;
            } catch (ex) {
            }
            onSuccess(response);
        },
        error: function (e) {
            $("#loader").hide();
            const errors = e.responseJSON ? e.responseJSON : [];
            let allErrors = "";
            for (let i = 0; i < errors.length; i++) {
                allErrors += errors[i];
            }
            onError(allErrors)
        }
    })
}

function isValidSize(file) {
    const maxSize = 1000000 * 10;
    return file.size <= maxSize;
}

function isValidType(file) {
    let types = ['pdf', 'png', 'jpeg', 'jpg', 'zip', 'rar', 'doc', 'docx'];
    for (let i = 0; i < types.length; i++) {
        if (file.name.toLowerCase().endsWith(types[i])) {
            return true;
        }
    }
    return false;
}