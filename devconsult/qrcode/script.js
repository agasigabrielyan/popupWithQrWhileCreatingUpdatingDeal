// при обновлении сделки отобразим qr код
BX.addCustomEvent(
    "BX.Crm.EntityEditor:onRefreshLayout",
    BX.delegate(function(data) {
        let dealId = data._entityId;
        ajaxRequestForQrCode(data, dealId);
    })
);

// при создании сделки отобразим qr код
BX.addCustomEvent(
    "SidePanel.Slider:onReload",
    BX.delegate(function(data) {
        let currentDealPagetitle = document.getElementById("pagetitle");
        if( currentDealPagetitle.classList.contains("pagetitle-item") ) {
            let string = currentDealPagetitle.innerText;
            if((string.match(/\[[0-9]+\]\sЗаявка/).length)>0) {
                let dealId = string.match(/[0-9]+/)[0];
                if( dealId > 0 ) {
                    ajaxRequestForQrCode(data, dealId);
                }
            }
        }
    })
);

// метод осуществляет ajax запрос для получения qr кода и отображает его popup
function ajaxRequestForQrCode(data, dealId) {
    let ajaxData = {};
    ajaxData['sessid'] = BX.bitrix_sessid();
    ajaxData['dealId'] = dealId;
    ajaxData['categoryId'] = "1";     // только сущность Заявки
    BX.ajax.post(
        "/bitrix/services/main/ajax.php?mode=class&c=pusk:mobile.qr&action=getQrSticker",
        ajaxData,
        function(rawAnswer) {
            let answer = JSON.parse(rawAnswer);
            let dataHtml = answer.data.html;
            // отобразим попап с полученным dataHtml версткой qr кода
            let popupWindowIdentifier = "popup-message_" + (Math.random() + 1).toString(36).substring(7);
            let popup = BX.PopupWindowManager.create(popupWindowIdentifier, null, {
                autoHide: true,
                offsetTop: 0,
                padding: 60,
                overlay : true,
                draggable: {restrict:true},
                closeByEsc: true,
                content: dataHtml,
                offsetLeft: -165,
                closeIcon: { right : "0", top : "0", width: "64px", height: "64px", opacity: 1},
                events: {

                }
            });
            popup.show();
        }
    );
}