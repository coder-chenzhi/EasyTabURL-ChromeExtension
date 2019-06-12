// SAMPLE
this.manifest = {
    "name": "My Extension",
    "icon": "icon.png",
    "settings": [{
            "tab": i18n.get("settings"),
            "group": i18n.get("formatting"),
            "name": "template",
            "type": "text",
            "label": i18n.get("template"),
            "text": ""
        },
        {
            "tab": i18n.get("settings"),
            "group": i18n.get("formatting"),
            "name": "templateDesc",
            "type": "description",
            "text": i18n.get("templateDesc")
        },
        {
            "tab": i18n.get("settings"),
            "group": i18n.get("filtering"),
            "name": "whiteList",
            "type": "textarea",
            "label": i18n.get("whiteList"),
            "text": ""
        },
        {
            "tab": i18n.get("settings"),
            "group": i18n.get("filtering"),
            "name": "blackList",
            "type": "textarea",
            "label": i18n.get("blackList"),
            "text": ""
        },
        {
            "tab": i18n.get("settings"),
            "group": i18n.get("filtering"),
            "name": "filteringDesc",
            "type": "description",
            "text": i18n.get("filteringDesc")
        },
        {
            "tab": i18n.get("help"),
            "group": i18n.get("support"),
            "name": "supportDesc",
            "type": "description",
            "text": i18n.get("supportDesc")
        },
        {
            "tab": i18n.get("help"),
            "group": i18n.get("get in touch"),
            "name": "touchDesc",
            "type": "description",
            "text": i18n.get("touchDesc")
        }
    ]
};