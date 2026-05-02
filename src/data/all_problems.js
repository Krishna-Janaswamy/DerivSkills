import { STAGE1_PROBLEMS_CODE } from './stage1_problems';
import { ARRAY_PROBLEMS_CODE } from './array_problems';
import { ARRAY_PROBLEMS_PART2 } from './array_problems_part2';
import { ARRAY_PROBLEMS_PART3 } from './array_problems_part3';
import { STAGE2_POPULATED } from './stage2_populated';
import { STAGE2_POPULATED_PART2 } from './stage2_populated_part2';
import { STRING_PROBLEMS_CODE } from './string_problems';
import { STRING_PROBLEMS_PART2 } from './string_problems_part2';
import { LINKED_LIST_PROBLEMS_CODE } from './linked_list_problems';
import { LINKED_LIST_PROBLEMS_PART2 } from './linked_list_problems_part2';
import { STACK_PROBLEMS_CODE } from './stack_problems';
import { STACK_PROBLEMS_PART2 } from './stack_problems_part2';
import { QUEUE_PROBLEMS_CODE } from './queue_problems';
import { QUEUE_PROBLEMS_PART2 } from './queue_problems_part2';
import { HASHING_PROBLEMS_CODE } from './hashing_problems';
import { HASHING_PROBLEMS_PART2 } from './hashing_problems_part2';
import { RECURSION_PROBLEMS_CODE } from './recursion_problems';
import { RECURSION_PROBLEMS_PART2 } from './recursion_problems_part2';
import { BACKTRACKING_PROBLEMS_CODE } from './backtracking_problems';
import { BACKTRACKING_PROBLEMS_PART2 } from './backtracking_problems_part2';
import { BINARY_SEARCH_PROBLEMS_CODE } from './binary_search_problems';
import { BINARY_TREE_PROBLEMS_CODE } from './binary_tree_problems';
import { BST_PROBLEMS_CODE } from './bst_problems';
import { HEAP_PROBLEMS_CODE } from './heap_problems';
import { GRAPH_PROBLEMS_CODE } from './graph_problems';
import { DP_PROBLEMS_CODE } from './dp_problems';
import { GREEDY_PROBLEMS_CODE } from './greedy_problems';
import { BIT_MANIPULATION_PROBLEMS_CODE } from './bit_manipulation_problems';
import { AUTO_GENERATED_PROBLEMS } from './auto_generated_problems';
import { STAGE3_FULL_CODE } from './stage3_full_code';
import { STAGE4_FULL_CODE } from './stage4_full_code';

export const ALL_PROBLEMS_DICTIONARY = {
  // 0. Base Fallback for all 1443 outcomes so the IDE never crashes
  ...AUTO_GENERATED_PROBLEMS,

  // 1. Concrete implementations override fallbacks
  ...STAGE1_PROBLEMS_CODE,
  ...ARRAY_PROBLEMS_CODE,
  ...ARRAY_PROBLEMS_PART2,
  ...ARRAY_PROBLEMS_PART3,
  ...STAGE2_POPULATED,
  ...STAGE2_POPULATED_PART2,
  ...STRING_PROBLEMS_CODE,
  ...STRING_PROBLEMS_PART2,
  ...LINKED_LIST_PROBLEMS_CODE,
  ...LINKED_LIST_PROBLEMS_PART2,
  ...STACK_PROBLEMS_CODE,
  ...STACK_PROBLEMS_PART2,
  ...QUEUE_PROBLEMS_CODE,
  ...QUEUE_PROBLEMS_PART2,
  ...HASHING_PROBLEMS_CODE,
  ...HASHING_PROBLEMS_PART2,
  ...RECURSION_PROBLEMS_CODE,
  ...RECURSION_PROBLEMS_PART2,
  ...BACKTRACKING_PROBLEMS_CODE,
  ...BACKTRACKING_PROBLEMS_PART2,
  ...BINARY_SEARCH_PROBLEMS_CODE,
  ...BINARY_TREE_PROBLEMS_CODE,
  ...BST_PROBLEMS_CODE,
  ...HEAP_PROBLEMS_CODE,
  ...GRAPH_PROBLEMS_CODE,
  ...DP_PROBLEMS_CODE,
  ...GREEDY_PROBLEMS_CODE,
  ...BIT_MANIPULATION_PROBLEMS_CODE,
  ...STAGE3_FULL_CODE,
  ...STAGE4_FULL_CODE
};
