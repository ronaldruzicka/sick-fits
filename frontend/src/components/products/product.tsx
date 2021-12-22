import { ItemStyles } from 'components/styles/ItemStyles';
import { PriceTag } from 'components/styles/PriceTag';
import { Title } from 'components/styles/Title';
import { Maybe, Product as ProductType } from 'graphql/types';
import { formatMoney } from 'lib/formatMoney';
import Link from 'next/link';
import React from 'react';

type Props = {
  data: Maybe<ProductType> | undefined;
};

export const Product = ({ data }: Props) => {
  if (!data) {
    return null;
  }

  const imageUrl = data.photo?.image?.publicUrlTransformed;
  const { name, price } = data;

  return (
    <ItemStyles>
      {imageUrl && name && <img src={imageUrl} alt={name} />}
      <Title>
        <Link href={`product/${data.id}`}>{name}</Link>
      </Title>
      <PriceTag>{formatMoney(price)}</PriceTag>
      <p>{data.description}</p>
    </ItemStyles>
  );
};
