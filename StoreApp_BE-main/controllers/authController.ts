import { Request, Response } from "express";

const authService = require("../services/authService");

const createAccount = async (req: Request, res: Response) => {
  try {
    let account = await authService.createAccountService(req.body);
    return res.status(200).json(account);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const loginAccount = async (req: Request, res: Response) => {
  try {
    let account = await authService.loginAccountService(req.body);
    return res.status(200).json(account);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
const loginAccountGoogle = async (req: Request, res: Response) => {
  try {
    let account = await authService.loginAccountGoogleService(req.body);
    return res.status(200).json(account);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
const createAccountAddress = async (req: Request, res: Response) => {
  try {
    let account = await authService.createAccountAddressService(req.body);
    return res.status(200).json(account);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const getAllAccountAddressByUsername = async (req: Request, res: Response) => {
  try {
    let account = await authService.getAllAccountAddressByUsernameService(
      req.query
    );
    return res.status(200).json(account);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const getAccountAddressByStatus = async (req: Request, res: Response) => {
  try {
    let account = await authService.getAccountAddressByStatusService();
    return res.status(200).json(account);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const DeleteAccountAddressByID = async (req: Request, res: Response) => {
  try {
    let account = await authService.DeleteAccountAddressByIDService(req.query);
    return res.status(200).json(account);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const UpdateStatusAccountAddressByID = async (req: Request, res: Response) => {
  try {
    let account = await authService.UpdateStatusAccountAddressByIDService(
      req.query
    );
    return res.status(200).json(account);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  createAccount,
  loginAccount,
  loginAccountGoogle,
  createAccountAddress,
  getAllAccountAddressByUsername,
  DeleteAccountAddressByID,
  UpdateStatusAccountAddressByID,
  getAccountAddressByStatus,
};
