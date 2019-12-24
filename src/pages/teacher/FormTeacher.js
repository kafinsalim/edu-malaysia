import React from "react";
import { Form, Select, Button, Input, DatePicker } from "antd";
import moment from "moment";

const { Option } = Select;

class FormTeacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      teacherId: null
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form, onSubmit } = this.props;
    form.validateFields((error, values) => {
      if (!error) {
        onSubmit(values);
        form.resetFields();
      }
    });
  };

  render() {
    const { data, form } = this.props;
    console.log("formteacher props", this.props);
    if (data && data.id) {
      console.log("mampus ajig", data);
      delete data.id;
      delete data.created_at;
      delete data.updated_at;
      data.date_of_birth = moment(data.date_of_birth, "YYYY-MM-DD");
      form.setFieldsInitialValue(data);
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
        <Form.Item label="Nama Depan" hasFeedback>
          {getFieldDecorator("first_name", {
            rules: [{ required: true, message: "Mohon isi nama depan!" }]
          })(<Input placeholder="Silahkan isi nama depan" />)}
        </Form.Item>
        <Form.Item label="Nama Belakang" hasFeedback>
          {getFieldDecorator("last_name", {
            rules: [{ required: true, message: "Mohon isi nama belakang!" }]
          })(<Input placeholder="Silahkan isi nama belakang" />)}
        </Form.Item>
        <Form.Item label="Tempat Lahir" hasFeedback>
          {getFieldDecorator("place_of_birth", {
            rules: [{ required: true, message: "Mohon isi tempat lahir!" }]
          })(<Input placeholder="Silahkan isi tempat lahir" />)}
        </Form.Item>
        <Form.Item label="Tanggal Lahir" hasFeedback>
          {getFieldDecorator("date_of_birth", {
            rules: [
              {
                type: "object",
                required: true,
                message: "Mohon pilih tanggal lahir!"
              }
            ]
          })(
            <DatePicker
              placeholder="Silahkan pilih tanggal lahir"
              style={{ width: "100%" }}
              showToday={false}
            />
          )}
        </Form.Item>
        <Form.Item label="Jenis Kelamin" hasFeedback>
          {getFieldDecorator("gender", {
            rules: [{ required: true, message: "Mohon pilih jenis kelamin!" }]
          })(
            <Select placeholder="Pilih jenis kelamin">
              <Option value="L">Laki-Laki</Option>
              <Option value="P">Perempuan</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Agama" hasFeedback>
          {getFieldDecorator("religion", {
            rules: [{ required: true, message: "Mohon isi agama!" }]
          })(<Input placeholder="Silahkan isi agama" />)}
        </Form.Item>
        <Form.Item label="Asal Universitas" hasFeedback>
          {getFieldDecorator("university", {
            rules: [{ required: true, message: "Mohon isi asal universitas!" }]
          })(<Input placeholder="Silahkan isi asal universitas" />)}
        </Form.Item>
        <Form.Item label="Jurusan" hasFeedback>
          {getFieldDecorator("major", {
            rules: [{ required: true, message: "Mohon isi jurusan!" }]
          })(<Input placeholder="Silahkan isi jurusan" />)}
        </Form.Item>
        <Form.Item label="Tahun Angkatan" hasFeedback>
          {getFieldDecorator("year_of_dedication", {
            rules: [{ required: true, message: "Mohon pilih tahun angkatan!" }]
          })(
            <Select placeholder="Silahkan pilih tahun angkatan">
              <Option value="06">06</Option>
              <Option value="07">07</Option>
              <Option value="08">08</Option>
              <Option value="09">09</Option>
              <Option value="10">10</Option>
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

export default Form.create({ name: "form_teacher" })(FormTeacher);
