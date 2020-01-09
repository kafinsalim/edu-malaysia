import React from "react";
import { Form, Select, Button, Input, DatePicker } from "antd";
import moment from "moment";
import { reqTeacher } from "../../utils";

const { Option } = Select;

class FormAssembly extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      teacherList: [],
      assemblyId: null
    };
  }

  componentDidMount() {
    console.log("mounting...");
    reqTeacher.getAllTeachers().then(res => {
      const filteredTeacher = res.filter(item => item.is_assembled === false);
      this.setState({ teacherList: filteredTeacher });
    });
  }

  componentWillUnmount() {
    const { form } = this.props;
    form.resetFields("form_assembly");
    console.log("I AM Will DEad, reset yea");
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form, onSubmit } = this.props;
    form.validateFields((error, values) => {
      if (!error) {
        values.startWorkDate = moment().format("YYYY-MM-DD");
        onSubmit(values);
      }
    });
  };

  render() {
    const { teacherList } = this.state;
    const { data, form } = this.props;
    console.log("formassembly props", this.props);
    if (data && data.id) {
      console.log("hit to setValue", data);
      form.setFieldsInitialValue(data);
    } else {
      console.log("no data && data.id");
      form.resetFields("form_assembly");
    }

    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="Guru" hasFeedback>
          {getFieldDecorator("teacherId", {
            rules: [{ required: true, message: "Mohon pilih guru!" }]
          })(
            <Select placeholder="Pilih guru">
              {teacherList &&
                teacherList.map(item => (
                  <Option key={item.id} value={item.id}>
                    {item.first_name} {item.last_name}
                  </Option>
                ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Simpan
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: "form_assembly" })(FormAssembly);
