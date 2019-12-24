import React from "react";
import { Form, Select, Button, Input, Upload, Icon } from "antd";
import moment from "moment";

const { Option } = Select;

class FormCLC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      clcId: null,
      clcLevelSelected: "clc_sd"
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form, onSubmit } = this.props;
    form.validateFields((error, values) => {
      if (!error) {
        values.date_of_birth = moment(values.date_of_birth).format("YYYY-MM-DD");
        onSubmit(values);
        form.resetFields();
      }
    });
  };

  handleCLCChange = value => {
    console.log(`CLC Level to ${value}`);
    this.setState({ clcLevelSelected: value });
  };

  renderCLCClass = () => {
    const { clcLevelSelected } = this.state;
    const { getFieldDecorator } = this.props.form;
    if (clcLevelSelected === "clc_sd") {
      return (
        <Form.Item label="Jumlah Siswa" hasFeedback>
          <Form.Item
            style={{
              display: "inline-block",
              width: "31%",
              paddingRight: "2%",
              marginBottom: 8
            }}
          >
            {getFieldDecorator("class_1", {
              rules: [{ required: true, message: "Mohon isi kordinat latitude!" }]
            })(<Input placeholder="Total Siswa" />)}
          </Form.Item>
          <Form.Item
            style={{
              display: "inline-block",
              width: "31%",
              padding: "auto 2%",
              marginBottom: 8
            }}
          >
            {getFieldDecorator("class_2", {
              rules: [{ required: true, message: "Mohon isi kordinat latitude!" }]
            })(<Input placeholder="Total Siswa" />)}
          </Form.Item>
          <Form.Item
            style={{
              display: "inline-block",
              width: "31%",
              paddingLeft: "2%",
              marginBottom: 8
            }}
          >
            {getFieldDecorator("class_3", {
              rules: [{ required: true, message: "Mohon isi kordinat latitude!" }]
            })(<Input placeholder="Total Siswa" />)}
          </Form.Item>
        </Form.Item>
      );
    } else {
      return (
        <Form.Item label="Jumlah Siswa" hasFeedback>
          <Form.Item
            style={{
              display: "inline-block",
              width: "31%",
              paddingRight: "2%",
              marginBottom: 8
            }}
          >
            {getFieldDecorator("class_1", {
              rules: [{ required: true, message: "Mohon isi kordinat latitude!" }]
            })(<Input placeholder="Total Siswa" />)}
          </Form.Item>
          <Form.Item
            style={{
              display: "inline-block",
              width: "31%",
              padding: "auto 2%",
              marginBottom: 8
            }}
          >
            {getFieldDecorator("class_2", {
              rules: [{ required: true, message: "Mohon isi kordinat latitude!" }]
            })(<Input placeholder="Total Siswa" />)}
          </Form.Item>
          <Form.Item
            style={{
              display: "inline-block",
              width: "31%",
              paddingLeft: "2%",
              marginBottom: 8
            }}
          >
            {getFieldDecorator("class_3", {
              rules: [{ required: true, message: "Mohon isi kordinat latitude!" }]
            })(<Input placeholder="Total Siswa" />)}
          </Form.Item>
          <Form.Item
            style={{
              display: "inline-block",
              width: "31%",
              paddingRight: "2%",
              marginBottom: 8
            }}
          >
            {getFieldDecorator("class_4", {
              rules: [{ required: true, message: "Mohon isi kordinat latitude!" }]
            })(<Input placeholder="Total Siswa" />)}
          </Form.Item>
          <Form.Item
            style={{
              display: "inline-block",
              width: "31%",
              padding: "auto 2%",
              marginBottom: 8
            }}
          >
            {getFieldDecorator("class_5", {
              rules: [{ required: true, message: "Mohon isi kordinat latitude!" }]
            })(<Input placeholder="Total Siswa" />)}
          </Form.Item>
          <Form.Item
            style={{
              display: "inline-block",
              width: "31%",
              paddingLeft: "2%",
              marginBottom: 8
            }}
          >
            {getFieldDecorator("class_6", {
              rules: [{ required: true, message: "Mohon isi kordinat latitude!" }]
            })(<Input placeholder="Total Siswa" />)}
          </Form.Item>
        </Form.Item>
      );
    }
  };

  normFile = e => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const { data, form } = this.props;
    console.log("formclc props", this.props);
    if (data && data.id) {
      console.log("hit to setValue", data);
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
        <Form.Item label="Nama CLC" hasFeedback>
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "Mohon isi nama CLC!" }]
          })(<Input placeholder="Silahkan isi nama CLC" />)}
        </Form.Item>
        <Form.Item label="Level" hasFeedback>
          {getFieldDecorator("clc_level", {
            rules: [{ required: true, message: "Mohon pilih level CLC!" }]
          })(
            <Select placeholder="Pilih level CLC" onChange={this.handleCLCChange}>
              <Option value="clc_sd">SD</Option>
              <Option value="clc_smp">SMP</Option>
            </Select>
          )}
        </Form.Item>
        {this.renderCLCClass()}
        <Form.Item label="Status" hasFeedback>
          {getFieldDecorator("status", {
            rules: [{ required: true, message: "Mohon pilih status CLC!" }]
          })(
            <Select placeholder="Pilih status CLC">
              <Option value="ladang">Ladang</Option>
              <Option value="non_ladang">Non Ladang</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Gugus" hasFeedback>
          {getFieldDecorator("gugus", {
            rules: [{ required: true, message: "Mohon isi gugus!" }]
          })(<Input placeholder="Silahkan isi gugus" />)}
        </Form.Item>
        <Form.Item label="Kordinat" style={{ marginBottom: 0 }} hasFeedback>
          <Form.Item style={{ display: "inline-block", width: "50%", paddingRight: 8 }}>
            {getFieldDecorator("lat", {
              rules: [{ required: true, message: "Mohon isi kordinat latitude!" }]
            })(<Input placeholder="Isi latitude" />)}
          </Form.Item>
          <Form.Item style={{ display: "inline-block", width: "50%", paddingLeft: 8 }}>
            {getFieldDecorator("long", {
              rules: [{ required: true, message: "Mohon isi kordinat longitude!" }]
            })(<Input placeholder="Isi longitude" />)}
          </Form.Item>
        </Form.Item>
        <Form.Item label="Note" hasFeedback>
          {getFieldDecorator("note", {
            rules: [{ required: true, message: "Mohon isi note!" }]
          })(<Input placeholder="Silahkan isi note" />)}
        </Form.Item>
        <Form.Item
          label="Berkas Perizinan"
          extra="mohon hanya unggah berkas doc atau pdf"
        >
          {getFieldDecorator("permit", {
            valuePropName: "fileList",
            getValueFromEvent: this.normFile
          })(
            <Upload name="logo" action="/upload.do">
              <Button>
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>
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

export default Form.create({ name: "form_clc" })(FormCLC);
