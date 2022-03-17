import React, { useEffect, useState } from "react";
import moment from "moment";
const RefactoredDate = ({ time }) => {
  return <span>{moment(parseInt(time)).fromNow()}</span>;
};

export default RefactoredDate;
