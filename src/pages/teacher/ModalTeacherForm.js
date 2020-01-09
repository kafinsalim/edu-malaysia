import React from "react";
import { reqTeacher } from "../../utils";
import { Modal, Spin, message } from "antd";
import FormTeacher from "./FormTeacher";

export default function ModalTeacherForm(props) {
  const { visible, onClose, onSubmit, teacherId } = props;
  const [fetching, setFetching] = React.useState(false);
  const [formData, setFormData] = React.useState({});
  // const data containing render content
  const ModalTitle = !!teacherId ? "Edit data Guru" : "Tambahkan data Guru";

  React.useEffect(() => {
    console.log(`effect teacherId:${teacherId}`);
    function getTeacher(id) {
      console.log(`getTeacher by id ${id}`);
      setFetching(true);
      reqTeacher
        .getTeacherById(id)
        .then(response => {
          console.log("NGE THEN GETTEACHER BYID");
          setFormData(response);
          setFetching(false);
        })
        .catch(e => {
          setFetching(false);
          onClose();
          message.warning("terdapat masalah jaringan");
          console.error(e);
        });
    }
    if (teacherId) {
      getTeacher(teacherId);
    } else {
      setFormData({});
    }
  }, [teacherId]);

  const handleSubmit = data => {
    // form submit function which will invoke after successful validation
    setFetching(true);
    if (!teacherId) {
      try {
        reqTeacher
          .addTeacher(data)
          .then(response => {
            if (response.status === 200) {
              setFetching(false);
              onSubmit();
              onClose();
              message.success("Berhasil menyimpan data");
            } else {
              setFetching(false);
              message.warning("terdapat kesalahan, mohon ulangi tindakan");
            }
          })
          .catch(error => {
            setFetching(false);
            message.warning("terdapat kesalahan");
            if (error.message) setFormData({ ...formData, errorMessage: error.message });
            console.log("catch", error);
          });
      } catch (error) {
        setFetching(false);
        message.warning("terdapat masalah jaringan");
        console.log("catch", error);
      }
      console.log("submited add ", data);
    } else {
      try {
        console.log(`editing with teacherId ${teacherId}`);
        reqTeacher.updateTeacher(teacherId, data).then(response => {
          if (response.status === 200) {
            setFetching(false);
            onSubmit();
            onClose();
            message.success("Edit berhasil !");
          } else {
            setFetching(false);
            message.warning("terdapat kesalahan");
          }
        });
      } catch (error) {
        setFetching(false);
        message.warning("terdapat masalah jaringan");
        console.log("catch", error);
      }
      console.warn("submited edit ", data);
    }
  };

  // you can watch individual input by pass the name of the input

  return (
    <Modal
      title={ModalTitle}
      style={{ top: 32 }}
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Spin tip="Sedang Memuat..." spinning={fetching}>
        {visible && <FormTeacher data={formData} onSubmit={handleSubmit} />}
      </Spin>
    </Modal>
  );
}
