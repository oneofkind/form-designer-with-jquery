$(function() {
  /**
   * 为 add 按钮增加监听事件
   * 点击后弹出增加元素的弹出框
   */
  $("#add").click(function() {
    $("#dialog").dialog({
      resizable: false,
      height: 400,
      width: 480
    });
  });

  $("#dialog form").submit(function(e) {
    e.preventDefault();
    let form = e.target;
    let data = getFormData(form);
    if (!data.title || !data.type) {
      $("button[type=submit]").attr("disabled", "disabled");
    }
    setDataToNewForm($("#form"), data);
    // console.log(data);
  });

  $("#edit").click(() => {
    $("#add").toggleClass("hidden");
    $("#preview").toggleClass("hidden");
    $("#edit").toggleClass("hidden");
    $(".title-show").hide(300);
    $("#container hr").show(700);
    $(".title-design").show(700);
  });

  $("#preview").click(() => {
    $("#add").toggleClass("hidden");
    $("#preview").toggleClass("hidden");
    $("#edit").toggleClass("hidden");
    $(".title-design").hide(300);
    $("#container hr").hide(300);
    $(".title-show").show(700);
  });

  $("#form").submit(e => {
    e.preventDefault();
  });

  function getFormData(form) {
    let data = {};
    let elForm = form || $(form);
    let list = elForm.querySelectorAll("[name]");
    list.forEach(element => {
      switch (element.nodeName) {
        case "INPUT":
          switch (element.type) {
            case "checkbox":
            case "radio":
              data[element.name] = element.checked;
              break;
            default:
              data[element.name] = element.value;
              break;
          }
          break;
        default:
          data[element.name] = element.value;
          break;
      }
    });
    return data;
  }

  const setDataToNewForm = (form, data) => {
    let template = `
        <label class="form-control">
            ${data.title}
            <input type="${data.type}"/>
            <button class='remove' type='button'>Remove</button>
        </label>
      `;
    form.append(template);
    bindRemoveEvent(form);
  };

  const bindRemoveEvent = form => {
    let list = form.find(".remove");
    for (let i = 0; i < list.length; i++) {
      let item = list[i];
      // 设定一个属性 has-click-event 如果存在该属性那么不用继续绑定事件，否则绑定删除事件
      if (item.getAttribute("has-click-event")) {
        continue;
      } else {
        item.setAttribute("has-click-event", true);
      }
      item.addEventListener("click", e => {
        let control = e.target.closest(".form-control");
        let parent = control.parentNode;
        parent.removeChild(control);
      });
    }
  };
});
