import React from "react";
import { reqAssembly } from "../../utils";
import { Modal, Spin, message } from "antd";
import FormAssembly from "./FormAssembly";

export default function ModalAssemblyForm(props) {
  const { visible, onClose, onSubmit, assemblyId } = props;
  const [fetching, setFetching] = React.useState(false);
  const [formData, setFormData] = React.useState({});
  const [isEditing, setIsEditing] = React.useState(false);
  // const data containing render content
  const ModalTitle = !!assemblyId ? "Edit data Guru" : "Tambahkan data Guru";

  React.useEffect(() => {
    console.log(`effect assemblyId:${assemblyId}`);
    function getAssembly(id) {
      console.log(`getAssembly by id ${id}`);
      setFetching(true);
      reqAssembly
        .getAssemblyById(id)
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
    if (assemblyId) {
      getAssembly(assemblyId);
    } else {
      setFormData({});
    }
  }, [assemblyId]);

  const handleSubmit = data => {
    // form submit function which will invoke after successful validation
    setFetching(true);
    if (!assemblyId) {
      try {
        reqAssembly.addAssembly(data).then(response => {
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
        console.log(`editing with assemblyId ${assemblyId}`);
        reqAssembly.updateAssembly(assemblyId, data).then(response => {
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
        {visible && ( // trigger componentDidMount
          <FormAssembly data={formData} onSubmit={handleSubmit} isEdit={!!assemblyId} />
        )}
      </Spin>
    </Modal>
  );
}
