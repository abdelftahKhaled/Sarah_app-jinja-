$('.notification-close').on('click', notificationClose);

function notificationClose() {
    $('.notification').hide();
}
$('#link').keyup(function() {
    var val = $(this).val();
    $(".preview").html(val);
    if (val.match(/[^a-zA-Z0-9]/g)) {
        $(this).val(val.replace(/[^a-zA-Z0-9]/g, ''));
        $(".preview").html(val.replace(/[^a-zA-Z0-9]/g, ''));
    }
});
$("#password").on('keyup', function(e) {
    var val = $(this).val();
    if (val.match(/[^a-zA-Z0-9-_@!$.#]/g)) {
        $(this).val(val.replace(/[^a-zA-Z0-9]/g, ''));
    }
});
$("#re").on('keyup', function(e) {
    var val = $(this).val();
    if (val.match(/[^a-zA-Z0-9]/g)) {
        $(this).val(val.replace(/[^a-zA-Z0-9]/g, ''));
    }
});

function showalert(msg) {
    alerty.alert(msg, {
        title: ' تنبيه ⚠️',
    }, function() {
        try {
            setcanback('alerty');
        } catch (err) {}
    })
    try {
        setcanback('alerty');
    } catch (err) {}
}

function server_erorr() {
    alerty.alert(' حدث خطأ في الخادم من فضلك أعد المحاولة بعد قليل ', {
        title: 'خطأ',
    }, function() {
        try {
            setcanback('alerty');
        } catch (err) {}
    })
    try {
        setcanback('alerty');
    } catch (err) {}
}

function app_new_update() {
    alerty.confirm('تحديث جديد للتطبيق متاح هل ترغب بالتحديث الآن ', {
        title: ' انتباه ',
        cancelLabel: 'تحديث',
        okLabel: 'لاحقأ'
    }, function() {
        setcanback('');
    }, function() {
        location.replace("https://play.google.com/store/apps/details?id=name.mixalwan.com");
        setcanback('');
    })
    setcanback('alerty');
}

function app_need_update() {
    alerty.confirm('لايمكن الاستمرار يجب تحميل اخر اصدار من التطبيق متوفر على جوجل بلاي ', {
        title: ' تحديث ',
        cancelLabel: 'تحديث',
        okLabel: 'لاحقأ'
    }, function() {
        setcanback('');
    }, function() {
        location.replace("https://play.google.com/store/apps/details?id=name.mixalwan.com");
        setcanback('');
    })
    setcanback('alerty');
}

function dir_erorr() {
    alerty.alert(' للاستمرار يجب تثبيت التطبيق من متجر جوجل بلاي حصراً ', {
        title: 'خطأ',
    }, function() {
        setcanback('');
    })
    setcanback('alerty');
}

function show_toast_msg(msg) {
    nativeToast({
        message: msg,
        position: 'center'
    })
}

function fav_found() {
    nativeToast({
        message: ' موجود بالمفضلة ',
        type: 'error',
        position: 'center'
    })
}

function phone_id_not_support() {
    alerty.confirm('لايمكن استخدام هذه الميزة خطأ في معرف الجهاز اتصل بالادارة لحل هذه المشكلة ', {
        title: ' خطأ ',
        cancelLabel: 'اتصل بالأدارة',
        okLabel: 'حسناً'
    }, function() {
        setcanback('');
    }, function() {
        location.replace("contact?issue=phone_id_not_support");
        setcanback('');
    })
    setcanback('alerty');
}

function setcanback(key) {
    Android.setcanback(key)
}

function showad(ad) {
    Android.showad(ad);
}

function copyy(txt) {
    Android.copyy(txt);
}

function dw(urlpath) {
    Android.dw(urlpath);
}

function facebook(fb) {
    Android.facebook(fb);
}

function shareimg(imgpath) {
    Android.shareimg(imgpath);
}

function sharetext(txt) {
    Android.sharetext(txt);
}

function sharesoical(type, text, surl) {
    Android.sharesoical(type, text, surl);
}

function closedialog(key) {
    if (key.includes('alerty')) {
        document.body.className = document.body.className.replace("no-scrolling", "");
        document.getElementById("alertclose").remove();
    }
}
window.smoothScroll = function(target) {
    var scrollContainer = target;
    do {
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) return;
        scrollContainer.scrollTop += 1;
    } while (scrollContainer.scrollTop == 0);
    var targetY = 0;
    do {
        if (target == scrollContainer) break;
        targetY += target.offsetTop;
    } while (target = target.offsetParent);
    scroll = function(c, a, b, i) {
        i++;
        if (i > 30) return;
        c.scrollTop = a + (b - a) / 30 * i;
        setTimeout(function() {
            scroll(c, a, b, i);
        }, 20);
    }
    scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}