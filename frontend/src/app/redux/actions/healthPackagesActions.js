import axios from 'axios';
import baseURL from '../baseURL';

import {
    HEALTH_PACKAGES_LIST_REQUEST,
    HEALTH_PACKAGES_LIST_SUCCESS,
    HEALTH_PACKAGES_LIST_FAIL,

    HEALTH_PACKAGE_DETAILS_REQUEST,
    HEALTH_PACKAGE_DETAILS_SUCCESS,
    HEALTH_PACKAGE_DETAILS_FAIL,

    HEALTH_PACKAGE_DELETE_REQUEST,
    HEALTH_PACKAGE_DELETE_SUCCESS,
    HEALTH_PACKAGE_DELETE_FAIL,

    HEALTH_PACKAGE_CREATE_REQUEST,
    HEALTH_PACKAGE_CREATE_SUCCESS,
    HEALTH_PACKAGE_CREATE_FAIL,

    HEALTH_PACKAGE_UPDATE_REQUEST,
    HEALTH_PACKAGE_UPDATE_SUCCESS,
    HEALTH_PACKAGE_UPDATE_FAIL,
} from '../constants/healthPackagesConstants';


export const listHealthPackages = () => async (dispatch) => {
    try {
        dispatch({ type: HEALTH_PACKAGES_LIST_REQUEST });

        const { data } = await axios.get(`${baseURL}/api/v1/healthPackages`);

        dispatch({
            type: HEALTH_PACKAGES_LIST_SUCCESS,
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: HEALTH_PACKAGES_LIST_FAIL,
            payload: error.response
                ? error.response.data.message
                : error.message,
        });
    }
}

export const listHealthPackageDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: HEALTH_PACKAGE_DETAILS_REQUEST });

        const { data } = await axios.get(`${baseURL}/api/v1/healthPackages/${id}`);

        dispatch({
            type: HEALTH_PACKAGE_DETAILS_SUCCESS,
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: HEALTH_PACKAGE_DETAILS_FAIL,
            payload: error.response
                ? error.response.data.message
                : error.message,
        });
    }
}

export const deleteHealthPackage = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: HEALTH_PACKAGE_DELETE_REQUEST,
        });

        const { data } = await axios.delete(
            `${baseURL}/api/v1/healthPackages/${id}`
        );

        dispatch({
            type: HEALTH_PACKAGE_DELETE_SUCCESS,
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: HEALTH_PACKAGE_DELETE_FAIL,
            payload: error.response
                ? error.response.data.message
                : error.message,
        });
    }
}

export const createHealthPackage = (healthPackage) => async (dispatch, getState) => {
    try {
        dispatch({
            type: HEALTH_PACKAGE_CREATE_REQUEST,
        });

        const { data } = await axios.post(
            `${baseURL}/api/v1/healthPackages`,
            healthPackage
        );

        dispatch({
            type: HEALTH_PACKAGE_CREATE_SUCCESS,
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: HEALTH_PACKAGE_CREATE_FAIL,
            payload: error.response
                ? error.response.data.message
                : error.message,
        });
    }
}

export const updateHealthPackage = (healthPackage) => async (dispatch, getState) => {
    try {
        dispatch({
            type: HEALTH_PACKAGE_UPDATE_REQUEST,
        });

        const { data } = await axios.patch(
            `${baseURL}/api/v1/healthPackages/${healthPackage.id}`,
            healthPackage
        );

        dispatch({
            type: HEALTH_PACKAGE_UPDATE_SUCCESS,
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: HEALTH_PACKAGE_UPDATE_FAIL,
            payload: error.response
                ? error.response.data.message
                : error.message,
        });
    }
}






