import React from "react";
import { reqCLC } from "../../utils";
import { Modal, Spin, message } from "antd";
import FormCLC from "./FormCLC";

export default function ModalCLCForm(props) {
  const { visible, onClose, onSubmit, CLCId } = props;
  const [fetching, setFetching] = React.useState(false);
  const [formData, setFormData] = React.useState({});
  // const data containing render content
  const ModalTitle = !!CLCId ? "Edit data CLC" : "Tambahkan data CLC";

  React.useEffect(() => {
    console.log(`effect CLCId:${CLCId}`);
    function getCLC(id) {
      console.log(`getCLC by id ${id}`);
      setFetching(true);
      reqCLC
        .getCLCById(id)
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
    if (CLCId) {
      getCLC(CLCId);
    } else {
      setFormData({});
    }
  }, [CLCId]);

  const handleSubmit = data => {
    // form submit function which will invoke after successful validation
    setFetching(true);
    if (!CLCId) {
      try {
        reqCLC.addCLC(data).then(response => {
          if (response.status === 200) {
            setFetching(false);
            onSubmit();
            onClose();
            message.success("Berhasil menyimpan data");
          } else {
            setFetching(false);
            message.warning("terdapat kesalahan, mohon ulangi tindakan");
          }
        });
      } catch (error) {
        setFetching(false);
        message.warning("terdapat masalah jaringan");
        console.log("catch", error);
      }
      console.log("submited add ", data);
    } else {
      try {
        console.log(`editing with CLCId ${CLCId}`);
        reqCLC.updateCLC(CLCId, data).then(response => {
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
        <FormCLC data={formData} onSubmit={handleSubmit} />
      </Spin>
    </Modal>
  );
}
