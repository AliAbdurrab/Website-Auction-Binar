import { Dropdown } from "react-bootstrap";
import { useState, useEffect } from "react";
import iconRed from "../../assets/icons/icon_red.svg";
import fi_bell from "../../assets/icons/fi_bell.svg";
import axios from "axios";

function Notifikasi() {
  const [notif, setNotif] = useState(0);
  const [notifSeller, setNotifSeller] = useState([]);
  const [notifBuyer, setNotifBuyer] = useState([]);

  const getNotif = () => {
    axios
      .get(`https://easy-school-uniform-ant.cyclic.app/api/v1/notification`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setNotifBuyer(response.data.data.buyer);
        setNotifSeller(response.data.data.seller);
      });
  };

  const checkNotifBuyer = () => {
    notifBuyer.map((data) => {
      if (data.is_read === false && data.Order !== null) {
        axios
          .get(
            `https://easy-school-uniform-ant.cyclic.app/api/v1/notification/${data.id}`,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((response) => {
            setNotif(notif + 1);
          })
          .catch((error) => {});
      }
    });
  };

  const checkNotifSeller = () => {
    notifSeller.map((data) => {
      if (data.is_read === false && data.Order !== null) {
        axios
          .get(
            `https://easy-school-uniform-ant.cyclic.app/api/v1/notification/${data.id}`,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((response) => {
            setNotif(notif + 1);
          })
          .catch((error) => {});
      }
    });
  };

  useEffect(() => {
    getNotif();
    checkNotifBuyer();
    checkNotifSeller();
  }, [notifBuyer, notifSeller]);

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle
          className="bg-transparent border-0"
          id="dropdown-basic"
        >
          {notif === 0 ? (
            <img src={fi_bell} alt="fi_bell" />
          ) : (
            <div className="notifBox">
              <img src={fi_bell} alt="fi_bell" />
              <img className="iconRed" src={iconRed} alt="iconRed" />
            </div>
          )}
        </Dropdown.Toggle>
      </Dropdown>
    </>
  );
}

export default Notifikasi;
