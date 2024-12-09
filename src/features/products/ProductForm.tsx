import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { addItem } from "./productsSlice";
import Input from "../../ui/Input";
import Label from "../../ui/Label";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  width: 100%;
  max-width: 48rem;
  margin: 0 auto;
`;

const LabelName = styled.span`
  width: 100%;
  max-width: 200px;
`;

const InputWrap = styled.div`
  position: relative;
  width: 100%;
`;

const ErrorMessage = styled.span`
  position: absolute;
  left: 0;
  bottom: -3px;
  transform: translateY(100%);
  font-size: 0.9rem;
  color: var(--color-red-700);
`;

const SubmitWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.7rem;
  background-color: var(--color-brand-600);
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 1rem;
  color: var(--color-brand-50);
`;

interface FormData {
  title: string;
  description: string;
  brand: string;
  model: string;
  price: number;
}

const ProductForm = () => {
  const dispatch = useAppDispatch();
  const { items: products } = useSelector((state: RootState) => state.products);
  const { register, handleSubmit, reset, formState } = useForm<FormData>();
  const { errors } = formState;
  const onSubmit = handleSubmit((data) => {
    const output = {
      ...data,
      id: products.length + 1,
      price: Number(data.price),
      image: "no-image.png",
    };

    dispatch(addItem(output));
    reset();
  });

  return (
    <Form onSubmit={onSubmit}>
      <Label>
        <LabelName>Название товара:</LabelName>
        <InputWrap>
          <Input
            type="text"
            id="title"
            {...register("title", { required: "Обязательное поле" })}
          />
          {errors?.title?.message && (
            <ErrorMessage>{errors?.title?.message}</ErrorMessage>
          )}
        </InputWrap>
      </Label>
      <Label>
        <LabelName>Описание товара:</LabelName>
        <InputWrap>
          <Input
            type="text"
            id="description"
            {...register("description", { required: "Обязательное поле" })}
          />
          {errors?.description?.message && (
            <ErrorMessage>{errors?.description?.message}</ErrorMessage>
          )}
        </InputWrap>
      </Label>
      <Label>
        <LabelName>Бренд:</LabelName>
        <InputWrap>
          <Input
            type="text"
            id="brand"
            {...register("brand", { required: "Обязательное поле" })}
          />
          {errors?.brand?.message && (
            <ErrorMessage>{errors?.brand?.message}</ErrorMessage>
          )}
        </InputWrap>
      </Label>
      <Label>
        <LabelName>Модель:</LabelName>
        <InputWrap>
          <Input
            type="text"
            id="model"
            {...register("model", { required: "Обязательное поле" })}
          />
          {errors?.model?.message && (
            <ErrorMessage>{errors?.model?.message}</ErrorMessage>
          )}
        </InputWrap>
      </Label>
      <Label>
        <LabelName>Цена:</LabelName>
        <InputWrap>
          <Input
            type="text"
            id="price"
            {...register("price", {
              required: "Обязательное поле",
              pattern: {
                value: /^[0-9]+$/,
                message: "Только цифры",
              },
            })}
          />
          {errors?.price?.message && (
            <ErrorMessage>{errors?.price?.message}</ErrorMessage>
          )}
        </InputWrap>
      </Label>
      <SubmitWrap>
        <SubmitButton type="submit">Добавить</SubmitButton>
      </SubmitWrap>
    </Form>
  );
};

export default ProductForm;
