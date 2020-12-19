import React, { useCallback, useEffect } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useMutation } from '@apollo/react-hooks';

import { PAY_DUES_MUTATION } from './payDues.graphql';
// Refetch
import { ACCOUNT_FORM_QUERY } from '../../user/AccountForm/accountForm.graphql';
import { CURRENT_USER_QUERY } from '../../../hooks/useUser/useUser.graphql';

import useUser from '../../../hooks/useUser';
import ErrorMessage from '../../utility/ErrorMessage';
import Loading from '../../utility/Loading';

import {
  getDuesAmountIncludingFees,
  convertToCents,
  whatYearIsIt,
} from '../../../lib/utils';

const PayDues = ({ onLoading, children }) => {
  const { loading, error, data } = useUser();
  const [payMembershipDues, { error: mutationError }] = useMutation(
    PAY_DUES_MUTATION,
  );

  const handleToken = useCallback(
    ({ id }) => {
      const asyncFn = async () => {
        onLoading(true);

        await payMembershipDues({
          variables: {
            data: {
              token: id,
            },
          },
          refetchQueries: [
            {
              query: CURRENT_USER_QUERY,
            },
            {
              query: ACCOUNT_FORM_QUERY,
            },
          ],
          awaitRefetchQueries: true,
        });

        onLoading(false);
      };

      asyncFn();
    },
    [payMembershipDues, onLoading],
  );

  useEffect(() => () => onLoading(false));

  if (loading) {
    return <Loading loading />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (!data) {
    return null;
  }

  const { myself } = data;
  const dues = getDuesAmountIncludingFees();

  return (
    <>
      <StripeCheckout
        amount={convertToCents(dues)}
        name="4-Players of Colorado"
        description={`${whatYearIsIt()} dues payment`}
        image="/img/logo-round.png"
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        currency="USD"
        email={myself.email}
        token={handleToken}
      >
        {children}
      </StripeCheckout>
      <ErrorMessage error={mutationError} />
    </>
  );
};

export default PayDues;
