import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary';
import useHttpErrorHandler from '../../hooks/http-error-handler';


const withErrorHandler = (WrappedComponent, axios) => {
    
    return props => {
        const {error,errorConfirmedHandler}=useHttpErrorHandler(axios);
        console.log('[eooor...console.]', props.error)
        return (
            <Aux>
                <Modal show={error}
                    modalClosed={errorConfirmedHandler}
                >
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        );
    }
};

export default withErrorHandler;
