import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useEffect, useState } from 'react';
import ListItem from './listItem';


const Marker = (props) => {

    const toiletIcon = 'https://pngtree.com/freepng/public-toilet-icon-cartoon_4478446.html'


    const { toilet } = props;


    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);


    return (
        <>
        <div onClick={onOpenModal} style={{cursor: 'pointer'}}>
        <i className="fas fa-map-marker text-primary"></i>
            <div>{toilet.name}</div>
        </div>
        <Modal  open={open} onClose={onCloseModal} center>
            <ListItem toilet={toilet} />
        </Modal>
        </>
    )
}

export default Marker