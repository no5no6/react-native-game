exports.meal= function(host, callback){
  apis = [];

  apis.push(
    {
      title: "获取每周菜单（早、午）",
      url: "/cookbook/:date",
      type: "GET",
      reqParams: [
        {
          name: ":date",
          type: "String",
          deception: "该日期为当前周中某一天，日期格式为'YYYY-MM-DD'"
        }
      ],
      resParams: [
        {
          name: "_id",
          deception: "唯一id"
        },
        {
          name: "weekOfYear",
          deception: "本周是这一年的第几周"
        },
        {
          name: "operation",
          deception: "提交人信息，包括个人、部门、领导信息。详见附录"
        },
        {
          name: "year",
          deception: "当前是哪一年"
        },
        {
          name: "dateArr",
          deception: "本周包含日期"
        },
        {
          name: "lunch",
          deception: "午餐"
        },
        {
          name: "breakfast",
          deception: "早餐"
        }
      ],
    }
  );

  apis.push(
    {
      title: "添加每周菜单（早、午） ps:具体提交参数可参照获取菜单API",
      url: "/cookbook",
      type: "POST",
      reqParams: [
        {
          name: "operation",
          type: 'Object',
          deception: "提交人信息，包括个人、部门、领导信息。详见附录"
        },
        {
          name: "lunch",
          type: 'Array',
          deception: "午餐,此参数为一个对象，共有三个键：date、week、food，分别代表，菜谱当天日期、菜谱当天是周几、当天菜谱的菜品（注意food为数组）"
        },
        {
          name: "breakfast",
          type: 'Array',
          deception: "早餐,此参数为一个对象，共有三个键：date、week、food，分别代表，菜谱当天日期、菜谱当天是周几、当天菜谱的菜品（注意food为数组）"
        }
      ]
    }
  );

  apis.push(
    {
      title: "更新每周菜单（早、午） ps:具体提交参数可参照获取菜单API",
      url: "/cookbook/:weekOfYear",
      type: "PUT",
      reqParams: [
        {
          name: ":weekOfYear",
          type: "String",
          deception: "要获取的菜单是一年中的第几周"
        },
        {
          name: "operation",
          type: 'Object',
          deception: "提交人信息，包括个人、部门、领导信息。详见附录"
        },
        {
          name: "lunch",
          type: 'Array',
          deception: "午餐,此参数为一个对象，共有三个键：date、week、food，分别代表，菜谱当天日期、菜谱当天是周几、当天菜谱的菜品（注意food为数组）"
        },
        {
          name: "breakfast",
          type: 'Array',
          deception: "早餐,此参数为一个对象，共有三个键：date、week、food，分别代表，菜谱当天日期、菜谱当天是周几、当天菜谱的菜品（注意food为数组）"
        }
      ]
    }
  );

  apis.push(
    {
      title: "查询当天菜单（晚餐）",
      url: "/menu/:date",
      type: "GET",
      reqParams: [
        {
          name: ":date",
          type: "String",
          deception: "该日期为当前周中某一天，日期格式为'YYYY-MM-DD'"
        }
      ],
      resParams: [
        {
          name: "_id",
          deception: "唯一id"
        },
        {
          name: "operation",
          deception: "提交人信息，包括个人、部门、领导信息。详见附录"
        },
        {
          name: "status",
          deception: "是否开启了订餐(true为开启，false为关闭)"
        },
        {
          name: "menu",
          deception: "当天菜单，类型为数组"
        }
      ]
    }
  );

  apis.push(
    {
      title: "添加当天菜单（晚餐）",
      url: "/menu",
      type: "POST",
      reqParams: [
        {
          name: "operation",
          type: "Object",
          deception: "提交人信息，包括个人、部门、领导信息。详见附录"
        },
        {
          name: "status",
          type: "Boolean",
          deception: "是否开始订餐(true为开启，false为关闭)"
        },
        {
          name: "menu",
          type: "Array",
          deception: "当天菜单"
        }
      ]
    }
  );

  apis.push(
    {
      title: "更新菜单（晚餐）",
      url: "/menu/:date",
      type: "PUT",
      reqParams: [
        {
          name: ":date",
          type: "String",
          deception: "该日期为当前周中某一天，日期格式为'YYYY-MM-DD'"
        },
        {
          name: "operation",
          type: "Object",
          deception: "提交人信息，包括个人、部门、领导信息。详见附录"
        },
        {
          name: "status",
          type: "Boolean",
          deception: "是否开始订餐(true为开启，false为关闭)"
        },
        {
          name: "menu",
          type: "Array",
          deception: "当天菜单"
        }
      ]
    }
  );



  return apis;
}