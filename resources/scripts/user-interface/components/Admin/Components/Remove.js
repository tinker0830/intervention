import { useContext } from '@wordpress/element';
import AdminContext from '../../AdminContext';
import { getInterventionKey } from '../../../utils/admin';

/**
 * Remove Item
 *
 * @param {object} param
 * @returns {<Remove />}
 */
const Remove = ({ item: key }) => {
  const { applied, index, setApplied, setIsBlocking } =
    useContext(AdminContext);

  /**
   * Handle Click
   *
   * @param {string} key
   * @param {any} value
   */
  const handleClick = (key, value = true) => {
    /**
     * is Role Group
     * @param {*} itemIndex
     * @returns
     */
    const isActiveRoleGroup = (itemIndex) => {
      return index === itemIndex;
    };

    /**
     * Toggle
     */
    const update = (item) => {
      const add = () => {
        return { ...item.components, ...{ [key]: [value, false] } };
      };

      const del = () => {
        delete item.components[key];
        return item.components;
      };

      // https://eslint.org/docs/rules/no-prototype-builtins
      return {
        roles: item.roles,
        components: Object.prototype.hasOwnProperty.call(item.components, key)
          ? del()
          : add(),
        immutable: item.immutable,
      };
    };

    const appliedChanged = applied.reduce((carry, item, itemIndex) => {
      const result = isActiveRoleGroup(itemIndex) ? update(item) : item;
      carry.push(result);
      return carry;
    }, []);

    setApplied(appliedChanged);
    setIsBlocking(true);
  };

  return (
    <div
      onClick={() => {
        handleClick(`${getInterventionKey(key)}`, true);
      }}
    >
      <span>{getInterventionKey(key)}</span>
    </div>
  );
};

export default Remove;
