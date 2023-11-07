import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/auth";
import { createConfirmationMessage } from "../../scripts/notifications";

import { FiHeart } from "react-icons/fi";
import { RiHomeLine} from "react-icons/ri";
import { IoMdContact } from "react-icons/io";
import { SlLocationPin } from "react-icons/sl";
import { TbShoppingCartPlus } from "react-icons/tb";
import { LuBox } from "react-icons/lu";
import { MdLogout } from "react-icons/md";

import { Button } from "../Button";

import { Container } from "./style";

export function NavMenu({ ...rest }) {
  const { userData, isAdmin, SignOut } = useAuth();

  const navigate = useNavigate();
  const route = useLocation();

  function handleOpenModalLogin() {
    if(window.innerWidth < 1000) {
      navigate("/login");
      return;
    }

    document.querySelector(".modal-login").show();
    sessionStorage.setItem("@zer01modas:modal", "open");
  }

  async function handleSignOut() {
    await SignOut();
    handleCloseModalDisconnect();
  }

  function handleWindowResize() {
    //para o modal se adaptar ao tamanho da tela;
    const modal = document.querySelector(".modal-login");
    if(modal) {
      modal.style.width = `${window.innerWidth}px`;
      modal.style.height = `${window.innerHeight}px`;
    }
  }

  function navigateHome() {
    if(route.pathname != "/") {
      navigate("/");
    }

  }

  function navigateFavorites() {
    navigate("/favorites");
  }

  function navigateNew() {
    navigate("/new");
  }

  function handleOpenModalDisconnect() {
    const buttonConfirm = createConfirmationMessage("Desconectar? :(");
    buttonConfirm.addEventListener("click", handleSignOut);
    sessionStorage.setItem("@zer01modas:modal", "open");
  }

  function handleCloseModalDisconnect() {
    document.querySelector(".confirmationModal").remove();
    sessionStorage.removeItem("@zer01modas:modal");
    document.querySelector(".boxButtons .nav-menu").style.display = "none";
  }

  useEffect(() => {
    handleWindowResize();
    window.onresize = handleWindowResize;

  }, []);

  return (
    <Container className="nav-menu" {...rest}>
      <Button icon={ <RiHomeLine /> } title="Início" onClick={ navigateHome } />
      <Button icon={ <IoMdContact /> } title="Minha Conta" />

      { !isAdmin && <Button icon={ <FiHeart /> } title="Favoritos" className="buttonsOnlyMobile" onClick={ navigateFavorites } /> }

      { !isAdmin && <Button icon={ <LuBox /> } title="Meus pedidos" /> }
      { !isAdmin && <Button icon={ <SlLocationPin /> } title="Meus Endereços" /> }

      { isAdmin && <Button icon={ <TbShoppingCartPlus /> } title="Novo produto" onClick={ navigateNew } /> }

      <Button icon={ <MdLogout /> } title={ userData ? "Sair" : "Entrar" } onClick={ userData ? handleOpenModalDisconnect : handleOpenModalLogin } />
    </Container>
  )
}