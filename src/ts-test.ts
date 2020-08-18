// 校验
// 定义接口类型
interface Formdata {
  name: string;
  password: string;
}
// 定义成功失败函数类型
type Vality = (data: Formdata) => boolean;
type ValityFail = (data: Formdata) => void;
// 定义成功校验
const validataSuccess = (data: Formdata) => {
  if (data.name === "") {
    return false;
  }
  if (data.password === "") {
    return false;
  }
  return true;
};
// 校验失败处理
const validataFail = () => {
  console.log("error");
};
function validate(valid: Vality, valideFail: ValityFail) {
  return function(target: any, name: string, descriptor: any) {
    const oldValue = descriptor.value;
    descriptor.value = function(requestData: Formdata) {
      // 开始验证
      if (!valid(requestData)) {
        // 验证失败
        valideFail(requestData);
        return;
      }
      return oldValue.apply(this);
    };
    return descriptor;
  };
}
class Form {
  form = {
    name: "",
    password: "",
  };
  @validate(validataSuccess, validataFail)
  submit(form: Formdata) {
    console.log("success");
  }
}
const form1 = new Form();

form1.submit(form1.form);

form1.form = {
  name: "randy",
  password: "123456",
};

form1.submit(form1.form);
//暗号： you can you up
