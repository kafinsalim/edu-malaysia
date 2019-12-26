import React from "react";
import { Form, Select, Button, Input, Upload, Icon, Affix } from "antd";
import moment from "moment";

const { Option } = Select;

class FormCLC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      clcId: null,
      clcLevelSelected: "clc_smp"
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form, onSubmit } = this.props;
    const { clcLevelSelected } = this.state;
    form.validateFields((error, values) => {
      if (!error) {
        if (clcLevelSelected === "clc_smp") {
          values.clc_level_data_support = {
            student_per_class: [
              { class_level: 1, total_class_student: Number(values.class_1) },
              { class_level: 2, total_class_student: Number(values.class_2) },
              { class_level: 3, total_class_student: Number(values.class_3) }
            ]
          };
          delete values.class_1;
          delete values.class_2;
          delete values.class_3;
        } else {
          values.clc_level_data_support = {
            student_per_class: [
              { class_level: 1, total_class_student: Number(values.class_1) },
              { class_level: 2, total_class_student: Number(values.class_2) },
              { class_level: 3, total_class_student: Number(values.class_3) },
              { class_level: 4, total_class_student: Number(values.class_4) },
              { class_level: 5, total_class_student: Number(values.class_5) },
              { class_level: 6, total_class_student: Number(values.class_6) }
            ]
          };
          delete values.class_1;
          delete values.class_2;
          delete values.class_3;
          delete values.class_4;
          delete values.class_5;
          delete values.class_6;
        }
        values.coordinate = {
          lat: values.lat,
          long: values.long
        };
        delete values.lat;
        delete values.long;
        onSubmit(values);
        form.resetFields();
      }
    });
  };

  handleCLCChange = value => {
    this.setState({ clcLevelSelected: value });
  };

  renderCLCClass = () => {
    const { clcLevelSelected } = this.state;
    const { getFieldDecorator } = this.props.form;
    if (clcLevelSelected === "clc_smp") {
      return (
        <Form.Item label="Jumlah Siswa" hasFeedback>
          <Form.Item
            style={{
              display: "inline-block",
              width: "31%",
              marginRight: "2%",
              marginBottom: 8
            }}
          >
            {getFieldDecorator("class_1", { required: true })(
              <Input placeholder="Kelas 1" />
            )}
          </Form.Item>
          <Form.Item
            style={{
              display: "inline-block",
              width: "31%",
              marginLeft: "1.5%",
              marginRight: "1.5%",
              marginBottom: 8
            }}
          >
            {getFieldDecorator("class_2", { required: true })(
              <Input placeholder="Kelas 2" />
            )}
          </Form.Item>
          <Form.Item
            style={{
              display: "inline-block",
              width: "31%",
              marginLeft: "2%",
              marginBottom: 8
            }}
          >
            {getFieldDecorator("class_3", { required: true })(
              <Input placeholder="Kelas 3" />
            )}
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
              marginRight: "2%",
              marginBottom: 8
            }}
          >
            {getFieldDecorator("class_1", { required: true })(
              <Input placeholder="Kelas 1" />
            )}
          </Form.Item>
          <Form.Item
            style={{
              display: "inline-block",
              width: "31%",
              marginLeft: "1.5%",
              marginRight: "1.5%",
              marginBottom: 8
            }}
          >
            {getFieldDecorator("class_2", { required: true })(
              <Input placeholder="Kelas 2" />
            )}
          </Form.Item>
          <Form.Item
            style={{
              display: "inline-block",
              width: "31%",
              marginLeft: "2%",
              marginBottom: 8
            }}
          >
            {getFieldDecorator("class_3", { required: true })(
              <Input placeholder="Kelas 3" />
            )}
          </Form.Item>
          <Form.Item
            style={{
              display: "inline-block",
              width: "31%",
              marginRight: "2%",
              marginBottom: 8
            }}
          >
            {getFieldDecorator("class_4", { required: true })(
              <Input placeholder="Kelas 4" />
            )}
          </Form.Item>
          <Form.Item
            style={{
              display: "inline-block",
              width: "31%",
              marginLeft: "1.5%",
              marginRight: "1.5%",
              marginBottom: 8
            }}
          >
            {getFieldDecorator("class_5", { required: true })(
              <Input placeholder="Kelas 5" />
            )}
          </Form.Item>
          <Form.Item
            style={{
              display: "inline-block",
              width: "31%",
              marginLeft: "2%",
              marginBottom: 8
            }}
          >
            {getFieldDecorator("class_6", { required: true })(
              <Input placeholder="Kelas 6" />
            )}
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

  componentDidUpdate() {
    const { data, form } = this.props;
    console.log("formclc props", this.props);
    if (data && data.id) {
      // remove irrelevant view data
      delete data.id;
      delete data.created_at;
      delete data.updated_at;
      // juggle data to fit property key
      const { clc_level_data_support, coordinate, clc_level, gugus, status } = data;
      data.clc_level = clc_level.toLocaleLowerCase();
      data.gugus = gugus.toLocaleLowerCase();
      data.status = status.toLocaleLowerCase();
      const { student_per_class } = clc_level_data_support;
      student_per_class.forEach((elem, index) => {
        data[`class_${index + 1}`] = elem.total_class_student
          ? elem.total_class_student
          : 0;
      });

      delete data.clc_level_data_support;
      const { lat, long } = coordinate;
      data.lat = lat;
      data.long = long;
      delete data.coordinate;
      if (clc_level === "clc_smp") {
        this.setState({ clcLevelSelected: "clc_smp" }, () =>
          form.setFieldsInitialValue(data)
        );
      } else {
        this.setState({ clcLevelSelected: "clc_sd" }, () =>
          form.setFieldsInitialValue(data)
        );
      }
    }
  }

  render() {
    const { data, form } = this.props;
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
            <Select placeholder="Pilih SD / SMP" onChange={this.handleCLCChange}>
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
            rules: [{ required: true, message: "Mohon pilih gugus!" }]
          })(
            <Select placeholder="Pilih gugus">
              {/* di backend error kalo pilih ini
               <Option value="i">I</Option>
              <Option value="ii">II</Option>
              <Option value="iii">III</Option>
              <Option value="iv">IV</Option>
              <Option value="v">V</Option>
              <Option value="vi">VI</Option>
              <Option value="vii">VII</Option>
              <Option value="viii">VIII</Option>
              <Option value="ix">IX</Option>
              <Option value="x">X</Option>
              <Option value="xi">XI</Option>
              <Option value="xii">XII</Option>
              <Option value="xiii">XIII</Option>
              <Option value="xiv">XIV</Option> */}
              <Option value="sarawak">SARAWAK</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Kordinat" style={{ marginBottom: 0 }} hasFeedback>
          <Form.Item style={{ display: "inline-block", width: "50%", paddingRight: 8 }}>
            {getFieldDecorator("lat", {
              rules: [{ required: true, message: "Mohon isi kordinat latitude!" }]
            })(<Input placeholder="Latitude" />)}
          </Form.Item>
          <Form.Item style={{ display: "inline-block", width: "50%", paddingLeft: 8 }}>
            {getFieldDecorator("long", {
              rules: [{ required: true, message: "Mohon isi kordinat longitude!" }]
            })(<Input placeholder="Longitude" />)}
          </Form.Item>
        </Form.Item>
        <Form.Item label="Catatan" hasFeedback>
          {getFieldDecorator("note")(<Input placeholder="(Opsional) isi catatan" />)}
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
