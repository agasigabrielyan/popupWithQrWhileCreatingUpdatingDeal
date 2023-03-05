<?php defined('B_PROLOG_INCLUDED') || die;

AddEventHandler("main", "OnBeforeProlog", "MyOnBeforePrologHandlerEventOnDealSave", 50);

function MyOnBeforePrologHandlerEventOnDealSave()
{
    CJSCore::RegisterExt(
        "qrcode.on.deal.submit",
        array(
            "js" => "/local/js/devconsult/qrcode/script.js",
            "css" => "/local/js/devconsult/qrcode/style.css",
            "rel" => ['popup', 'ajax', 'fx', 'ls', 'date', 'json', 'window','jquery'],
            "skip_core" => false,
        )
    );
    CJSCore::Init(['qrcode.on.deal.submit']);
}