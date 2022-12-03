import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpenseItem from "./ExpenseItem";

function RenderExpenseItem(itemData) {
  return <ExpenseItem {...itemData.item} />;
}
const ExpensesList = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={RenderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpensesList;

const styles = StyleSheet.create({});
