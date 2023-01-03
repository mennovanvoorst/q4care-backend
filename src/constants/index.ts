/* eslint no-bitwise: "off" */

/*
  === PERMISSION BITS ===
  00 - 0000000 x
  01 - 0000001 x
  02 - 0000010 x
  04 - 0000100 x
  08 - 0001000 x
  16 - 0010000 x
  32 - 0100000 x
  64 - 1000000 x
*/

export const USER_ROLES = {
  default: 0,
  student: 2,
  teacher: 4,
  admin: 8,
  paid: 16,
};
