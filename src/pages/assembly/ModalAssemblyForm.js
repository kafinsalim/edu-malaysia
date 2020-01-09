import React from "react";
import { reqAssembly } from "../../utils";
import { Modal, Spin, message } from "antd";
import FormAssembly from "./FormAssembly";

export default function ModalAssemblyForm(props) {
  const { visible, onClose, onSubmit, CLCId } = props;
  const [fetching, setFetching] = React.useState(false);
  const [formData, setFormData] = React.useState({});
  // const data containing render content
  // const ModalTitle = !!CLCId ? "Edit data Guru" : "Tempatkan Guru";
  const ModalTitle = "Tempatkan Guru";

  // React.useEffect(() => {
  //   console.log(`effect CLCId:${CLCId}`);
  //   function getAssembly(id) {
  //     console.log(`getAssembly by id ${id}`);
  //     setFetching(true);
  //     reqAssembly
  //       .getAssemblyById(id)
  //       .then(response => {
  //         console.log("NGE THEN GET ASEMBLE BYID");
  //         setFormData(response);
  //         setFetching(false);
  //       })
  //       .catch(e => {
  //         setFetching(false);
  //         onClose();
  //         message.warning("terdapat masalah jaringan");
  //         console.error(e);
  //       });
  //   }
  //   if (CLCId) {
  //     getAssembly(CLCId);
  //   } else {
  //     setFormData({});
  //   }
  // }, [CLCId]);

  const handleSubmit = data => {
    // form submit function which will invoke after successful validation
    setFetching(true);
    // if (CLCId) {
    try {
      data.CLCId = CLCId; // monkeypatch CLCId
      console.log("assembleTeacher", data);
      reqAssembly.assembleTeacher(data).then(response => {
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
      // }
      console.log("submited add ", data);
      // } else {
      // try {
      //   console.log(`editing with CLCId ${CLCId}`);
      //   reqAssembly.updateAssembly(CLCId, data).then(response => {
      //     if (response.status === 200) {
      //       setFetching(false);
      //       onSubmit();
      //       onClose();
      //       message.success("Edit berhasil !");
      //     } else {
      //       setFetching(false);
      //       message.warning("terdapat kesalahan");
      //     }
      //   });
      // } catch (error) {
      setFetching(false);
      message.warning("terdapat masalah jaringan");
      //   console.log("catch", error);
      // }
      console.warn("submited edit ", data);
    }
  };

  return (
    <Modal
      title={ModalTitle}
      style={{ top: 32 }}
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Spin tip="Sedang Memuat..." spinning={fetching}>
        {visible && <FormAssembly data={formData} onSubmit={handleSubmit} />}
      </Spin>
    </Modal>
  );
}
