import { head, find, isEmpty } from 'lodash';

import Admin from '../models/Admin';
import User from '../models/User';

const findByField = async (field: string, value: string) => {
  const models = [];
  models.push(User);
  models.push(Admin);

  return Promise.all(models.map((model) => model.find({ [field]: value }).lean()));

  // return Promise.all(
  //   models.map((model) =>
  //     model.find({ [field]: { $regex: new RegExp(value, 'i') } })
  //   )
  // );
};

const findExistingUser = async (field: string, value: string) => {
  const data = await findByField(field, value);

  const result = find(data, (item) => !isEmpty(item));

  return head(result);
};

export default findExistingUser;
