// Type definitions for Underscore 1.4
// Project: http://underscorejs.org/
// Definitions by:
// Boris Yankov <https://github.com/borisyankov/>
// Josh Baldwin <https://github.com/jbaldwin/underscore.d.ts>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

// Notes:
//  1) Parameter types may be declared as List<T> and Dictionary<T>.
//     However, return types must be declared as T[] where possible
//     otherwise Array<T> functions are not available on returns.
//  2) Callbacks do not use '?' parameters!

/**
* Underscore OOP Wrapper, all Underscore functions that take an object
* as the first parameter can be invoked through this function.
* @param key First argument to Underscore object functions.
**/
declare function _<T>(value: Array<T>): _<T>;
declare function _<T>(value: T): _<T>;

declare module _ {

	/**
	* underscore.js template settings, set templateSettings or pass as an argument
	* to 'template()' to overide defaults.
	**/
	interface TemplateSettings {
		/**
		* Default value is '/<%([\s\S]+?)%>/g'.
		**/
		evaluate?: RegExp;

		/**
		* Default value is '/<%=([\s\S]+?)%>/g'.
		**/
		interpolate?: RegExp;

		/**
		* Default value is '/<%-([\s\S]+?)%>/g'.
		**/
		escape?: RegExp;
	}

	interface ListIterator<T, TResult> {
		(value: T, index: number, list: T[]): TResult;
	}

	interface ObjectIterator<T, TResult> {
		(element: T, key: string, list: any): TResult;
	}

	interface MemoIterator<T, TResult> {
		(prev: TResult, curr: T, index: number, list: T[]): TResult;
	}

	interface Collection<T> { }

	// Common interface between Arrays and jQuery objects
	interface List<T> extends Collection<T> {
		[index: number]: T;
		length: number;
	}

	interface Dictionary<T> extends Collection<T> {
		[index: string]: T;
	}

	/* *************
	 * Collections *
	 ************* */

	/**
	* Iterates over a list of elements, yielding each in turn to an iterator function. The iterator is
	* bound to the context object, if one is passed. Each invocation of iterator is called with three
	* arguments: (element, index, list). If list is a JavaScript object, iterator's arguments will be
	* (value, key, object). Delegates to the native forEach function if it exists.
	* @param list Iterates over this list of elements.
	* @param iterator Iterator function for each element `list`.
	* @param context 'this' object in `iterator`, optional.
	**/
	export function each<T>(
		list: List<T>,
		iterator: ListIterator<T, void>,
		context?: any): void;

	/**
	* @see _.each
	* @param object Iterators over this object's properties.
	* @param iterator Iterator function for each property on `obj`.
	* @param context 'this' object in `iterator`, optional.
	**/
	export function each<T extends {}>(
		object: Dictionary<T>,
		iterator: ObjectIterator<T, void>,
		context?: any): void;

	/**
	* @see _.each
	**/
	export function forEach<T>(
		list: List<T>,
		iterator: ListIterator<T, void >,
		context?: any): void;

	/**
	* @see _.each
	**/
	export function forEach<T extends {}>(
		object: Dictionary<T>,
		iterator: ObjectIterator<T, void >,
		context?: any): void;

	/**
	* Produces a new array of values by mapping each value in list through a transformation function
	* (iterator). If the native map method exists, it will be used instead. If list is a JavaScript
	* object, iterator's arguments will be (value, key, object).
	* @param list Maps the elements of this array.
	* @param iterator Map iterator function for each element in `list`.
	* @param context `this` object in `iterator`, optional.
	* @return The mapped array result.
	**/
	export function map<T, TResult>(
		list: List<T>,
		iterator: ListIterator<T, TResult>,
		context?: any): TResult[];

	/**
	* @see _.map
	* @param object Maps the properties of this object.
	* @param iterator Map iterator function for each property on `obj`.
	* @param context `this` object in `iterator`, optional.
	* @return The mapped object result.
	**/
	export function map<T extends {}, TResult>(
		object: Dictionary<T>,
		iterator: ObjectIterator<T, TResult>,
		context?: any): TResult[];

	/**
	* @see _.map
	**/
	export function collect<T, TResult>(
		list: List<T>, iterator:
		ListIterator<T, TResult>,
		context?: any): TResult[];

	/**
	* @see _.map
	**/
	export function collect<T extends {}, TResult>(
		object: Dictionary<T>,
		iterator: ObjectIterator<T, TResult>,
		context?: any): TResult[];

	/**
	* Also known as inject and foldl, reduce boils down a list of values into a single value.
	* Memo is the initial state of the reduction, and each successive step of it should be
	* returned by iterator. The iterator is passed four arguments: the memo, then the value
	* and index (or key) of the iteration, and finally a reference to the entire list.
	* @param list Reduces the elements of this array.
	* @param iterator Reduce iterator function for each element in `list`.
	* @param memo Initial reduce state.
	* @param context `this` object in `iterator`, optional.
	* @return Reduced object result.
	**/
	export function reduce<T, TResult>(
		list: Collection<T>,
		iterator: MemoIterator<T, TResult>,
		memo: TResult,
		context?: any): TResult;

	/**
	* @see _.reduce
	**/
	export function inject<T, TResult>(
		list: Collection<T>,
		iterator: MemoIterator<T, TResult>,
		memo: TResult,
		context?: any): TResult;

	/**
	* @see _.reduce
	**/
	export function foldl<T, TResult>(
		list: Collection<T>,
		iterator: MemoIterator<T, TResult>,
		memo: TResult,
		context?: any): TResult;

	/**
	* The right-associative version of reduce. Delegates to the JavaScript 1.8 version of
	* reduceRight, if it exists. Foldr is not as useful in JavaScript as it would be in a
	* language with lazy evaluation.
	* @param list Reduces the elements of this array.
	* @param iterator Reduce iterator function for each element in `list`.
	* @param memo Initial reduce state.
	* @param context `this` object in `iterator`, optional.
	* @return Reduced object result.
	**/
	export function reduceRight<T, TResult>(
		list: Collection<T>,
		iterator: MemoIterator<T, TResult>,
		memo: TResult,
		context?: any): TResult;

	/**
	* @see _.reduceRight
	**/
	export function foldr<T, TResult>(
		list: Collection<T>,
		iterator: MemoIterator<T, TResult>,
		memo: TResult,
		context?: any): TResult;

	/**
	* Looks through each value in the list, returning the first one that passes a truth
	* test (iterator). The function returns as soon as it finds an acceptable element,
	* and doesn't traverse the entire list.
	* @param list Searches for a value in this list.
	* @param iterator Search iterator function for each element in `list`.
	* @param context `this` object in `iterator`, optional.
	* @return The first acceptable found element in `list`, if nothing is found undefined/null is returned.
	**/
	export function find<T>(
		list: Collection<T>,
		iterator: ListIterator<T, boolean>,
		context?: any): T;

	/**
	* @see _.find
	**/
	export function detect<T>(
		list: Collection<T>,
		iterator: ListIterator<T, boolean>,
		context?: any): T;

	/**
	* Looks through each value in the list, returning an array of all the values that pass a truth
	* test (iterator). Delegates to the native filter method, if it exists.
	* @param list Filter elements out of this list.
	* @param iterator Filter iterator function for each element in `list`.
	* @param context `this` object in `iterator`, optional.
	* @return The filtered list of elements.
	**/
	export function filter<T>(
		list: Collection<T>,
		iterator: ListIterator<T, boolean>,
		context?: any): T[];

	/**
	* @see _.filter
	**/
	export function select<T>(
		list: Collection<T>,
		iterator: ListIterator<T, boolean>,
		context?: any): T[];

	/**
	* Looks through each value in the list, returning an array of all the values that contain all
	* of the key-value pairs listed in properties.
	* @param list List to match elements again `properties`.
	* @param properties The properties to check for on each element within `list`.
	* @return The elements within `list` that contain the required `properties`.
	**/
	export function where<T, U extends {}>(
		list: Collection<T>,
		properties: U): T[];

	/**
	* Looks through the list and returns the first value that matches all of the key-value pairs listed in properties.
	* @param list Search through this list's elements for the first object with all `properties`.
	* @param properties Properties to look for on the elements within `list`.
	* @return The first element in `list` that has all `properties`.
	**/
	export function findWhere<T, U extends {}>(
		list: List<T>,
		properties: U): T;

	/**
	* Returns the values in list without the elements that the truth test (iterator) passes.
	* The opposite of filter.
	* Return all the elements for which a truth test fails.
	* @param list Reject elements within this list.
	* @param iterator Reject iterator function for each element in `list`.
	* @param context `this` object in `iterator`, optional.
	* @return The rejected list of elements.
	**/
	export function reject<T>(
		list: Collection<T>,
		iterator: ListIterator<T, boolean>,
		context?: any): T[];

	/**
	* Returns true if all of the values in the list pass the iterator truth test. Delegates to the
	* native method every, if present.
	* @param list Truth test against all elements within this list.
	* @param iterator Trust test iterator function for each element in `list`.
	* @param context `this` object in `iterator`, optional.
	* @return True if all elements passed the truth test, otherwise false.
	**/
	export function all<T>(
		list: Collection<T>,
		iterator: ListIterator<T, boolean>,
		context?: any): boolean;

	/**
	* @see _.all
	**/
	export function every<T>(
		list: Collection<T>,
		iterator: ListIterator<T, boolean>,
		context?: any): boolean;

	/**
	* Returns true if any of the values in the list pass the iterator truth test. Short-circuits and
	* stops traversing the list if a true element is found. Delegates to the native method some, if present.
	* @param list Truth test against all elements within this list.
	* @param iterator Trust test iterator function for each element in `list`.
	* @param context `this` object in `iterator`, optional.
	* @return True if any elements passed the truth test, otherwise false.
	**/
	export function any<T>(
		list: Collection<T>,
		iterator?: ListIterator<T, boolean>,
		context?: any): boolean;

	/**
	* @see _.any
	**/
	export function some<T>(
		list: Collection<T>,
		iterator?: ListIterator<T, boolean>,
		context?: any): boolean;

	/**
	* Returns true if the value is present in the list. Uses indexOf internally,
	* if list is an Array.
	* @param list Checks each element to see if `value` is present.
	* @param value The value to check for within `list`.
	* @return True if `value` is present in `list`, otherwise false.
	**/
	export function contains<T>(
		list: Collection<T>,
		value: T): boolean;

	/**
	* @see _.contains
	**/
	export function include<T>(
		list: Collection<T>,
		value: T): boolean;

	/**
	* Calls the method named by methodName on each value in the list. Any extra arguments passed to
	* invoke will be forwarded on to the method invocation.
	* @param list The element's in this list will each have the method `methodName` invoked.
	* @param methodName The method's name to call on each element within `list`.
	* @param arguments Additional arguments to pass to the method `methodName`.
	**/
	export function invoke<T extends {}>(
		list: Collection<T>,
		methodName: string,
		...arguments: any[]): any;

	/**
	* A convenient version of what is perhaps the most common use-case for map: extracting a list of
	* property values.
	* @param list The list to pluck elements out of that have the property `propertyName`.
	* @param propertyName The property to look for on each element within `list`.
	* @return The list of values for `propertyName` for each element within `list`
	**/
	export function pluck<T extends {}>(
		list: Collection<T>,
		propertyName: string): any[];

	/**
	* Returns the maximum value in list.
	* @param list Finds the maximum value in this list.
	* @return Maximum value in `list`.
	**/
	export function max(list: List<number>): number;

	/**
	* Returns the maximum value in list. If iterator is passed, it will be used on each value to generate
	* the criterion by which the value is ranked.
	* @param list Finds the maximum value in this list.
	* @param iterator Compares each element in `list` to find the maximum value.
	* @param context `this` object in `iterator`, optional.
	* @return The maximum element within `list`.
	**/
	export function max<T>(
		list: Collection<T>,
		iterator?: ListIterator<T, any>,
		context?: any): T;

	/**
	* Returns the minimum value in list.
	* @param list Finds the minimum value in this list.
	* @return Minimum value in `list`.
	**/
	export function min(list: List<number>): number;

	/**
	* Returns the minimum value in list. If iterator is passed, it will be used on each value to generate
	* the criterion by which the value is ranked.
	* @param list Finds the minimum value in this list.
	* @param iterator Compares each element in `list` to find the minimum value.
	* @param context `this` object in `iterator`, optional.
	* @return The minimum element within `list`.
	**/
	export function min<T>(
		list: Collection<T>,
		iterator?: ListIterator<T, any>,
		context?: any): T;

	/**
	* Returns a sorted copy of list, ranked in ascending order by the results of running each value
	* through iterator. Iterator may also be the string name of the property to sort by (eg. length).
	* @param list Sorts this list.
	* @param iterator Sort iterator for each element within `list`.
	* @param context `this` object in `iterator`, optional.
	* @return A sorted copy of `list`.
	**/
	export function sortBy<T, TSort>(
		list: List<T>,
		iterator?: ListIterator<T, TSort>,
		context?: any): T[];

	/**
	* @see _.sortBy
	* @param iterator Sort iterator for each element within `list`.
	**/
	export function sortBy<T>(
		list: List<T>,
		iterator: string,
		context?: any): T[];

	/**
	* Splits a collection into sets, grouped by the result of running each value through iterator.
	* If iterator is a string instead of a function, groups by the property named by iterator on
	* each of the values.
	* @param list Groups this list.
	* @param iterator Group iterator for each element within `list`, return the key to group the element by.
	* @param context `this` object in `iterator`, optional.
	* @return An object with the group names as properties where each property contains the grouped elements from `list`.
	**/
	export function groupBy<T>(
		list: List<T>,
		iterator?: ListIterator<T, any>,
		context?: any): Dictionary<T[]>;

	/**
	* @see _.groupBy
	* @param iterator Group iterator for each element within `list`, return the key to group the element by.
	**/
	export function groupBy<T>(
		list: List<T>,
		iterator: string,
		context?: any): Dictionary<T[]>;

	/**
	* Sorts a list into groups and returns a count for the number of objects in each group. Similar
	* to groupBy, but instead of returning a list of values, returns a count for the number of values
	* in that group.
	* @param list Group elements in this list and then count the number of elements in each group.
	* @param iterator Group iterator for each element within `list`, return the key to group the element by.
	* @param context `this` object in `iterator`, optional.
	* @return An object with the group names as properties where each property contains the number of elements in that group.
	**/
	export function countBy<T>(
		list: Collection<T>,
		iterator?: ListIterator<T, any>,
		context?: any): Dictionary<number[]>;

	/**
	* @see _.countBy
	* @param iterator Function name
	**/
	export function countBy<T>(
		list: Collection<T>,
		iterator: string,
		context?: any): Dictionary<number[]>;

	/**
	* Returns a shuffled copy of the list, using a version of the Fisher-Yates shuffle.
	* @param list List to shuffle.
	* @return Shuffled copy of `list`.
	**/
	export function shuffle<T>(list: Collection<T>): T[];

	/**
	* Converts the list (anything that can be iterated over), into a real Array. Useful for transmuting
	* the arguments object.
	* @param list object to transform into an array.
	* @return `list` as an array.
	**/
	export function toArray<T>(list: Collection<T>): T[];

	/**
	* Return the number of values in the list.
	* @param list Count the number of values/elements in this list.
	* @return Number of values in `list`.
	**/
	export function size<T>(list: Collection<T>): number;

	/*********
	* Arrays *
	**********/

	/**
	* Returns the first element of an array. Passing n will return the first n elements of the array.
	* @param array Retrieves the first element of this array.
	* @return Returns the first element of `array`.
	**/
	export function first<T>(array: List<T>): T;

	/**
	* @see _.first
	* @param n Return more than one element from `array`.
	**/
	export function first<T>(
		array: List<T>,
		n: number): T[];

	/**
	* @see _.first
	**/
	export function head<T>(array: List<T>): T;

	/**
	* @see _.first
	**/
	export function head<T>(
		array: List<T>,
		n: number): T[];

	/**
	* @see _.first
	**/
	export function take<T>(array: List<T>): T;

	/**
	* @see _.first
	**/
	export function take<T>(
		array: List<T>,
		n: number): T[];

	/**
	* Returns everything but the last entry of the array. Especially useful on the arguments object.
	* Pass n to exclude the last n elements from the result.
	* @param array Retreive all elements except the last `n`.
	* @param n Leaves this many elements behind, optional.
	* @return Returns everything but the last `n` elements of `array`.
	**/
	export function initial<T>(
		array: List<T>,
		n?: number): T[];

	/**
	* Returns the last element of an array. Passing n will return the last n elements of the array.
	* @param array Retrieves the last element of this array.
	* @return Returns the last element of `array`.
	**/
	export function last<T>(array: List<T>): T;

	/**
	* @see _.last
	* @param n Return more than one element from `array`.
	**/
	export function last<T>(
		array: List<T>,
		n: number): T[];

	/**
	* Returns the rest of the elements in an array. Pass an index to return the values of the array
	* from that index onward.
	* @param array The array to retrieve all but the first `index` elements.
	* @param n The index to start retrieving elements forward from, optional, default = 1.
	* @return Returns the elements of `array` from `index` to the end of `array`.
	**/
	export function rest<T>(
		array: List<T>,
		n?: number): T[];

	/**
	* @see _.rest
	**/
	export function tail<T>(
		array: List<T>,
		n?: number): T[];

	/**
	* @see _.rest
	**/
	export function drop<T>(
		array: List<T>,
		n?: number): T[];

	/**
	* Returns a copy of the array with all falsy values removed. In JavaScript, false, null, 0, "",
	* undefined and NaN are all falsy.
	* @param array Array to compact.
	* @return Copy of `array` without false values.
	**/
	export function compact<T>(array: List<T>): T[];

	/**
	* Flattens a nested array (the nesting can be to any depth). If you pass shallow, the array will
	* only be flattened a single level.
	* @param array The array to flatten.
	* @param shallow If true then only flatten one level, optional, default = false.
	* @return `array` flattened.
	**/
	export function flatten(
		array: List<any>,
		shallow?: boolean): any[];

	/**
	* Returns a copy of the array with all instances of the values removed.
	* @param array The array to remove `values` from.
	* @param values The values to remove from `array`.
	* @return Copy of `array` without `values`.
	**/
	export function without<T>(
		array: List<T>,
		...values: T[]): T[];

	/**
	* Computes the union of the passed-in arrays: the list of unique items, in order, that are
	* present in one or more of the arrays.
	* @param arrays Array of arrays to compute the union of.
	* @return The union of elements within `arrays`.
	**/
	export function union<T>(...arrays: List<T>[]): T[];

	/**
	* Computes the list of values that are the intersection of all the arrays. Each value in the result
	* is present in each of the arrays.
	* @param arrays Array of arrays to compute the intersection of.
	* @return The intersection of elements within `arrays`.
	**/
	export function intersection<T>(...arrays: List<T>[]): T[];

	/**
	* Similar to without, but returns the values from array that are not present in the other arrays.
	* @param array Keeps values that are within `others`.
	* @param others The values to keep within `array`.
	* @return Copy of `array` with only `others` values.
	**/
	export function difference<T>(
		array: List<T>,
		...others: List<T>[]): T[];

	/**
	* Produces a duplicate-free version of the array, using === to test object equality. If you know in
	* advance that the array is sorted, passing true for isSorted will run a much faster algorithm. If
	* you want to compute unique items based on a transformation, pass an iterator function.
	* @param array Array to remove duplicates from.
	* @param isSorted True if `array` is already sorted, optiona, default = false.
	* @param iterator Transform the elements of `array` before comparisons for uniqueness.
	* @param context 'this' object in `iterator`, optional.
	* @return Copy of `array` where all elements are unique.
	**/
	export function uniq<T, TSort>(
		array: List<T>,
		isSorted?: boolean,
		iterator?: ListIterator<T, TSort>,
		context?: any): T[];

	/**
	* @see _.uniq
	**/
	export function uniq<T, TSort>(
		array: List<T>,
		iterator?: ListIterator<T, TSort>,
		context?: any): T[];

	/**
	* @see _.uniq
	**/
	export function unique<T, TSort>(
		array: List<T>,
		iterator?: ListIterator<T, TSort>,
		context?: any): T[];

	/**
	* @see _.uniq
	**/
	export function unique<T, TSort>(
		array: List<T>,
		isSorted?: boolean,
		iterator?: ListIterator<T, TSort>,
		context?: any): T[];


	/**
	* Merges together the values of each of the arrays with the values at the corresponding position.
	* Useful when you have separate data sources that are coordinated through matching array indexes.
	* If you're working with a matrix of nested arrays, zip.apply can transpose the matrix in a similar fashion.
	* @param arrays The arrays to merge/zip.
	* @return Zipped version of `arrays`.
	**/
	export function zip(...arrays: any[][]): any[][];

	/**
	* @see _.zip
	**/
	export function zip(...arrays: any[]): any[];

	/**
	* Converts arrays into objects. Pass either a single list of [key, value] pairs, or a
	* list of keys, and a list of values.
	* @param keys Key array.
	* @param values Value array.
	* @return An object containing the `keys` as properties and `values` as the property values.
	**/
	export function object<TResult extends {}>(
		keys: List<string>,
		values: List<any>): TResult;

	/**
	* Converts arrays into objects. Pass either a single list of [key, value] pairs, or a
	* list of keys, and a list of values.
	* @param keyValuePairs Array of [key, value] pairs.
	* @return An object containing the `keys` as properties and `values` as the property values.
	**/
	export function object<TResult extends {}>(...keyValuePairs: any[][]): TResult;

	/**
	* @see _.object
	**/
	export function object<TResult extends {}>(
		list: List<any>,
		values?: any): TResult;

	/**
	* Returns the index at which value can be found in the array, or -1 if value is not present in the array.
	* Uses the native indexOf function unless it's missing. If you're working with a large array, and you know
	* that the array is already sorted, pass true for isSorted to use a faster binary search ... or, pass a number
	* as the third argument in order to look for the first matching value in the array after the given index.
	* @param array The array to search for the index of `value`.
	* @param value The value to search for within `array`.
	* @param isSorted True if the array is already sorted, optional, default = false.
	* @return The index of `value` within `array`.
	**/
	export function indexOf<T>(
		array: List<T>,
		value: T,
		isSorted?: boolean): number;

	/**
	* @see _indexof
	**/
	export function indexOf<T>(
		array: List<T>,
		value: T,
		startFrom: number): number;

	/**
	* Returns the index of the last occurrence of value in the array, or -1 if value is not present. Uses the
	* native lastIndexOf function if possible. Pass fromIndex to start your search at a given index.
	* @param array The array to search for the last index of `value`.
	* @param value The value to search for within `array`.
	* @param from The starting index for the search, optional.
	* @return The index of the last occurance of `value` within `array`.
	**/
	export function lastIndexOf<T>(
		array: List<T>,
		value: T,
		from?: number): number;

	/**
	* Uses a binary search to determine the index at which the value should be inserted into the list in order
	* to maintain the list's sorted order. If an iterator is passed, it will be used to compute the sort ranking
	* of each value, including the value you pass.
	* @param list The sorted list.
	* @param value The value to determine its index within `list`.
	* @param iterator Iterator to compute the sort ranking of each value, optional.
	* @return The index where `value` should be inserted into `list`.
	**/
	export function sortedIndex<T, TSort>(
		list: List<T>,
		value: T,
		iterator?: (x: T) => TSort, context?: any): number;

	/**
	* A function to create flexibly-numbered lists of integers, handy for each and map loops. start, if omitted,
	* defaults to 0; step defaults to 1. Returns a list of integers from start to stop, incremented (or decremented)
	* by step, exclusive.
	* @param start Start here.
	* @param stop Stop here.
	* @param step The number to count up by each iteration, optional, default = 1.
	* @return Array of numbers from `start` to `stop` with increments of `step`.
	**/

	export function range(
		start: number,
		stop: number,
		step?: number): number[];
	
	/**
	* @see _.range
	* @param stop Stop here.
	* @return Array of numbers from 0 to `stop` with increments of 1.
	* @note If start is not specified the implementation will never pull the step (step = arguments[2] || 0)
	**/
	export function range(stop: number): number[];

	/*************
	 * Functions *
	 *************/

	/**
	* Bind a function to an object, meaning that whenever the function is called, the value of this will
	* be the object. Optionally, bind arguments to the function to pre-fill them, also known as partial application.
	* @param func The function to bind `this` to `object`.
	* @param context The `this` pointer whenever `fn` is called.
	* @param arguments Additional arguments to pass to `fn` when called.
	* @return `fn` with `this` bound to `object`.
	**/
	export function bind(
		func: (...as: any[]) => any,
		context: any,
		...arguments: any[]): () => any;

	/**
	* Binds a number of methods on the object, specified by methodNames, to be run in the context of that object
	* whenever they are invoked. Very handy for binding functions that are going to be used as event handlers,
	* which would otherwise be invoked with a fairly useless this. If no methodNames are provided, all of the
	* object's function properties will be bound to it.
	* @param object The object to bind the methods `methodName` to.
	* @param methodNames The methods to bind to `object`, optional and if not provided all of `object`'s
	* methods are bound.
	**/
	export function bindAll(
		object: any,
		...methodNames: string[]): any;

	/**
	* Partially apply a function by filling in any number of its arguments, without changing its dynamic this value.
	* A close cousin of bind.
	* @param fn Function to partially fill in arguments.
	* @param arguments The partial arguments.
	* @return `fn` with partially filled in arguments.
	**/
	export function partial(
		fn: Function,
		...arguments: any[]): Function;

	/**
	* Memoizes a given function by caching the computed result. Useful for speeding up slow-running computations.
	* If passed an optional hashFunction, it will be used to compute the hash key for storing the result, based
	* on the arguments to the original function. The default hashFunction just uses the first argument to the
	* memoized function as the key.
	* @param fn Computationally expensive function that will now memoized results.
	* @param hashFn Hash function for storing the result of `fn`.
	* @return Memoized version of `fn`.
	**/
	export function memoize(
		fn: Function,
		hashFn?: (n: any) => string): Function;

	/**
	* Much like setTimeout, invokes function after wait milliseconds. If you pass the optional arguments,
	* they will be forwarded on to the function when it is invoked.
	* @param fn Function to delay `waitMS` amount of ms.
	* @param wait The amount of milliseconds to delay `fn`.
	* @arguments Additional arguments to pass to `fn`.
	**/
	export function delay(
		func: Function,
		wait: number,
		...arguments: any[]): any;

	/**
	* @see _delay
	**/
	export function delay(
		func: Function,
		...arguments: any[]): any;

	/**
	* Defers invoking the function until the current call stack has cleared, similar to using setTimeout
	* with a delay of 0. Useful for performing expensive computations or HTML rendering in chunks without
	* blocking the UI thread from updating. If you pass the optional arguments, they will be forwarded on
	* to the function when it is invoked.
	* @param fn The function to defer.
	* @param arguments Additional arguments to pass to `fn`.
	**/
	export function defer(
		fn: Function,
		...arguments: any[]): void;

	/**
	* Creates and returns a new, throttled version of the passed function, that, when invoked repeatedly,
	* will only actually call the original function at most once per every wait milliseconds. Useful for
	* rate-limiting events that occur faster than you can keep up with.
	* @param fn Function to throttle `waitMS` ms.
	* @param wait The number of milliseconds to wait before `fn` can be invoked again.
	* @return `fn` with a throttle of `wait`.
	**/
	export function throttle(
		func: any,
		wait: number): Function;

	/**
	* Creates and returns a new debounced version of the passed function that will postpone its execution
	* until after wait milliseconds have elapsed since the last time it was invoked. Useful for implementing
	* behavior that should only happen after the input has stopped arriving. For example: rendering a preview
	* of a Markdown comment, recalculating a layout after the window has stopped being resized, and so on.
	*
	* Pass true for the immediate parameter to cause debounce to trigger the function on the leading instead
	* of the trailing edge of the wait interval. Useful in circumstances like preventing accidental double
	*-clicks on a "submit" button from firing a second time.
	* @param fn Function to debounce `waitMS` ms.
	* @param wait The number of milliseconds to wait before `fn` can be invoked again.
	* @param immediate True if `fn` should be invoked on the leading edge of `waitMS` instead of the trailing edge.
	* @return Debounced version of `fn` that waits `wait` ms when invoked.
	**/
	export function debounce(
		fn: Function,
		wait: number,
		immediate?: boolean): Function;

	/**
	* Creates a version of the function that can only be called one time. Repeated calls to the modified
	* function will have no effect, returning the value from the original call. Useful for initialization
	* functions, instead of having to set a boolean flag and then check it later.
	* @param fn Function to only execute once.
	* @return Copy of `fn` that can only be invoked once.
	**/
	export function once(fn: Function): Function;

	/**
	* Creates a version of the function that will only be run after first being called count times. Useful
	* for grouping asynchronous responses, where you want to be sure that all the async calls have finished,
	* before proceeding.
	* @param count Number of times to be called before actually executing.
	* @fn The function to defer execution `count` times.
	* @return Copy of `fn` that will not execute until it is invoked `count` times.
	**/
	export function after(
		count: number,
		fn: Function): Function;

	/**
	* Wraps the first function inside of the wrapper function, passing it as the first argument. This allows
	* the wrapper to execute code before and after the function runs, adjust the arguments, and execute it
	* conditionally.
	* @param fn Function to wrap.
	* @param wrapper The function that will wrap `fn`.
	* @return Wrapped version of `fn.
	**/
	export function wrap(
		fn: Function,
		wrapper: (fn: Function, ...args: any[]) => any): Function;

	/**
	* Returns the composition of a list of functions, where each function consumes the return value of the
	* function that follows. In math terms, composing the functions f(), g(), and h() produces f(g(h())).
	* @param functions List of functions to compose.
	* @return Composition of `functions`.
	**/
	export function compose(...functions: Function[]): Function;

	/**********
	* Objects *
	***********/

	/**
	* Retrieve all the names of the object's properties.
	* @param object Retreive the key or property names from this object.
	* @return List of all the property names on `object`.
	**/
	export function keys(object: any): string[];

	/**
	* Return all of the values of the object's properties.
	* @param object Retreive the values of all the properties on this object.
	* @return List of all the values on `object`.
	**/
	export function values(object: any): any[];

	/**
	* Convert an object into a list of [key, value] pairs.
	* @param object Convert this object to a list of [key, value] pairs.
	* @return List of [key, value] pairs on `object`.
	**/
	export function pairs(object: any): any[][];

	/**
	* Returns a copy of the object where the keys have become the values and the values the keys.
	* For this to work, all of your object's values should be unique and string serializable.
	* @param object Object to invert key/value pairs.
	* @return An inverted key/value paired version of `object`.
	**/
	export function invert(object: any): any;

	/**
	* Returns a sorted list of the names of every method in an object - that is to say,
	* the name of every function property of the object.
	* @param object Object to pluck all function property names from.
	* @return List of all the function names on `object`.
	**/
	export function functions(object: any): string[];

	/**
	* @see _functions
	**/
	export function methods(object: any): string[];

	/**
	* Copy all of the properties in the source objects over to the destination object, and return
	* the destination object. It's in-order, so the last source will override properties of the
	* same name in previous arguments.
	* @param destination Object to extend all the properties from `sources`.
	* @param sources Extends `destination` with all properties from these source objects.
	* @return `destination` extended with all the properties from the `sources` objects.
	**/
	export function extend(
		destination: any,
		...sources: any[]): any;

	/**
	* Return a copy of the object, filtered to only have values for the whitelisted keys
	* (or array of valid keys).
	* @param object Object to strip unwanted key/value pairs.
	* @keys The key/value pairs to keep on `object`.
	* @return Copy of `object` with only the `keys` properties.
	**/
	export function pick(
		object: any,
		...keys: string[]): any;

	/**
	* Return a copy of the object, filtered to omit the blacklisted keys (or array of keys).
	* @param object Object to strip unwanted key/value pairs.
	* @param keys The key/value pairs to remove on `object`.
	* @return Copy of `object` without the `keys` properties.
	**/
	export function omit(
		object: any,
		...keys: string[]): any;

	/**
	* Fill in null and undefined properties in object with values from the defaults objects,
	* and return the object. As soon as the property is filled, further defaults will have no effect.
	* @param object Fill this object with default values.
	* @param defaults The default values to add to `object`.
	* @return `object` with added `defaults` values.
	**/
	export function defaults(
		object: any,
		...defaults: any[]): any;

	/**
	* Create a shallow-copied clone of the object.
	* Any nested objects or arrays will be copied by reference, not duplicated.
	* @param object Object to clone.
	* @return Copy of `object`.
	**/
	export function clone<T>(object: T): T;

	/**
	* Invokes interceptor with the object, and then returns object. The primary purpose of this method
	* is to "tap into" a method chain, in order to perform operations on intermediate results within the chain.
	* @param object Argument to `interceptor`.
	* @param intercepter The function to modify `object` before continuing the method chain.
	* @return Modified `object`.
	**/
	export function tap<T>(object: T, intercepter: Function): T;

	/**
	* Does the object contain the given key? Identical to object.hasOwnProperty(key), but uses a safe
	* reference to the hasOwnProperty function, in case it's been overridden accidentally.
	* @param object Object to check for `key`.
	* @param key The key to check for on `object`.
	* @return True if `key` is a property on `object`, otherwise false.
	**/
	export function has(object: any, key: string): boolean;

	/**
	* Performs an optimized deep comparison between the two objects,
	* to determine if they should be considered equal.
	* @param object Compare to `other`.
	* @param other Compare to `object`.
	* @return True if `object` is equal to `other`.
	**/
	export function isEqual(object: any, other: any): boolean;

	/**
	* Returns true if object contains no values.
	* @param object Check if this object has no properties or values.
	* @return True if `object` is empty.
	**/
	export function isEmpty(object: any): boolean;

	/**
	* Returns true if object is a DOM element.
	* @param object Check if this object is a DOM element.
	* @return True if `object` is a DOM element, otherwise false.
	**/
	export function isElement(object: any): boolean;

	/**
	* Returns true if object is an Array.
	* @param object Check if this object is an Array.
	* @return True if `object` is an Array, otherwise false.
	**/
	export function isArray(object: any): boolean;

	/**
	* Returns true if value is an Object. Note that JavaScript arrays and functions are objects,
	* while (normal) strings and numbers are not.
	* @param object Check if this object is an Object.
	* @return True of `object` is an Object, otherwise false.
	**/
	export function isObject(object: any): boolean;

	/**
	* Returns true if object is an Arguments object.
	* @param object Check if this object is an Arguments object.
	* @return True if `object` is an Arguments object, otherwise false.
	**/
	export function isArguments(object: any): boolean;

	/**
	* Returns true if object is a Function.
	* @param object Check if this object is a Function.
	* @return True if `object` is a Function, otherwise false.
	**/
	export function isFunction(object: any): boolean;

	/**
	* Returns true if object is a String.
	* @param object Check if this object is a String.
	* @return True if `object` is a String, otherwise false.
	**/
	export function isString(object: any): boolean;

	/**
	* Returns true if object is a Number (including NaN).
	* @param object Check if this object is a Number.
	* @return True if `object` is a Number, otherwise false.
	**/
	export function isNumber(object: any): boolean;

	/**
	* Returns true if object is a finite Number.
	* @param object Check if this object is a finite Number.
	* @return True if `object` is a finite Number.
	**/
	export function isFinite(object: any): boolean;

	/**
	* Returns true if object is either true or false.
	* @param object Check if this object is a bool.
	* @return True if `object` is a boolean, otherwise false.
	**/
	export function isBoolean(object: any): boolean;

	/**
	* Returns true if object is a Date.
	* @param object Check if this object is a Date.
	* @return True if `object` is a Date, otherwise false.
	**/
	export function isDate(object: any): boolean;

	/**
	* Returns true if object is a RegExp.
	* @param object Check if this object is a RegExp.
	* @return True if `object` is a RegExp, otherwise false.
	**/
	export function isRegExp(object: any): boolean;

	/**
	* Returns true if object is NaN.
	* Note: this is not the same as the native isNaN function,
	* which will also return true if the variable is undefined.
	* @param object Check if this object is NaN.
	* @return True if `object` is NaN, otherwise false.
	**/
	export function isNaN(object: any): boolean;

	/**
	* Returns true if the value of object is null.
	* @param object Check if this object is null.
	* @return True if `object` is null, otherwise false.
	**/
	export function isNull(object: any): boolean;

	/**
	* Returns true if value is undefined.
	* @param object Check if this object is undefined.
	* @return True if `object` is undefined, otherwise false.
	**/
	export function isUndefined(value: any): boolean;

	/* *********
	 * Utility *
	********** */

	/**
	* Give control of the "_" variable back to its previous owner.
	* Returns a reference to the Underscore object.
	* @return Underscore object reference.
	**/
	export function noConflict(): any;

	/**
	* Returns the same value that is used as the argument. In math: f(x) = x
	* This function looks useless, but is used throughout Underscore as a default iterator.
	* @param value Identity of this object.
	* @return `value`.
	**/
	export function identity<T>(value: T): T;

	/**
	* Invokes the given iterator function n times.
	* Each invocation of iterator is called with an index argument
	* @param n Number of times to invoke `iterator`.
	* @param iterator Function iterator to invoke `n` times.
	* @param context `this` object in `iterator`, optional.
	**/
	export function times<TResult>(n: number, iterator: (n: number) => TResult, context?: any): TResult[];

	/**
	* Returns a random integer between min and max, inclusive. If you only pass one argument,
	* it will return a number between 0 and that number.
	* @param max The maximum random number.
	* @return A random number between 0 and `max`.
	**/
	export function random(max: number): number;

	/**
	* @see _.random
	* @param min The minimum random number.
	* @return A random number between `min` and `max`.
	**/
	export function random(min: number, max: number): number;

	/**
	* Allows you to extend Underscore with your own utility functions. Pass a hash of
	* {name: function} definitions to have your functions added to the Underscore object,
	* as well as the OOP wrapper.
	* @param object Mixin object containing key/function pairs to add to the Underscore object.
	**/
	export function mixin(object: any): void;

	/**
	* Generate a globally-unique id for client-side models or DOM elements that need one.
	* If prefix is passed, the id will be appended to it. Without prefix, returns an integer.
	* @param prefix A prefix string to start the unique ID with.
	* @return Unique string ID beginning with `prefix`.
	**/
	export function uniqueId(prefix: string): string;

	/**
	* @see _.uniqueId
	**/
	export function uniqueId(): number;

	/**
	* Escapes a string for insertion into HTML, replacing &, <, >, ", ', and / characters.
	* @param str Raw string to escape.
	* @return `str` HTML escaped.
	**/
	export function escape(str: string): string;

	/**
	* If the value of the named property is a function then invoke it; otherwise, return it.
	* @param object Object to maybe invoke function `property` on.
	* @param property The function by name to invoke on `object`.
	* @return The result of invoking the function `property` on `object.
	**/
	export function result(object: any, property: string): any;

	/**
	* Compiles JavaScript templates into functions that can be evaluated for rendering. Useful
	* for rendering complicated bits of HTML from JSON data sources. Template functions can both
	* interpolate variables, using <%= ... %>, as well as execute arbitrary JavaScript code, with
	* <% ... %>. If you wish to interpolate a value, and have it be HTML-escaped, use <%- ... %> When
	* you evaluate a template function, pass in a data object that has properties corresponding to
	* the template's free variables. If you're writing a one-off, you can pass the data object as
	* the second parameter to template in order to render immediately instead of returning a template
	* function. The settings argument should be a hash containing any _.templateSettings that should
	* be overridden.
	* @param templateString Underscore HTML template.
	* @param data Data to use when compiling `templateString`.
	* @param settings Settings to use while compiling.
	* @return Returns the compiled Underscore HTML template.
	**/
	export function template(templateString: string, data?: any, settings?: TemplateSettings): (...data: any[]) => string;

	/**
	* By default, Underscore uses ERB-style template delimiters, change the
	* following template settings to use alternative delimiters.
	**/
	export var templateSettings: TemplateSettings;

	/* **********
	 * Chaining *
	*********** */

	/**
	* Returns a wrapped object. Calling methods on this object will continue to return wrapped objects
	* until value() is used.
	* @param obj Object to chain.
	* @return Wrapped `obj`.
	**/
	export function chain(obj: any): _Chain<any>;

	/**
	* Extracts the value of a wrapped object.
	* @param obj Wrapped object to extract the value from.
	* @return Value of `obj`.
	**/
	export function value<T, TResult>(obj: T): TResult;
}

declare class _<T> {

	/* *************
	 * Collections *
	 ************* */

	/**
	* Wrapped type `any[]`.
	* @see _.each
	**/
	each(iterator: _.ListIterator<T, void>, context?: any): void;

	/**
	* @see _.each
	**/
	each(iterator: _.ObjectIterator<T, void>, context?: any): void;

	/**
	* @see _.each
	**/
	forEach(iterator: _.ListIterator<T, void>, context?: any): void;

	/**
	* @see _.each
	**/
	forEach(iterator: _.ObjectIterator<T, void>, context?: any): void;

	/**
	* Wrapped type `any[]`.
	* @see _.map
	**/
	map<TResult>(iterator: _.ListIterator<T, TResult>, context?: any): TResult[];

	/**
	* Wrapped type `any[]`.
	* @see _.map
	**/
	map<TResult>(iterator: _.ObjectIterator<T, TResult>, context?: any): TResult[];

	/**
	* @see _.map
	**/
	collect<TResult>(iterator: _.ListIterator<T, TResult>, context?: any): TResult[];

	/**
	* @see _.map
	**/
	collect<TResult>(iterator: _.ObjectIterator<T, TResult>, context?: any): TResult[];

	/**
	* Wrapped type `any[]`.
	* @see _.reduce
	**/
	reduce<TResult>(iterator: _.MemoIterator<T, TResult>, memo: TResult, context?: any): TResult;

	/**
	* @see _.reduce
	**/
	inject<TResult>(iterator: _.MemoIterator<T, TResult>, memo: TResult, context?: any): TResult;

	/**
	* @see _.reduce
	**/
	foldl<TResult>(iterator: _.MemoIterator<T, TResult>, memo: TResult, context?: any): TResult;

	/**
	* Wrapped type `any[]`.
	* @see _.reduceRight
	**/
	reduceRight<TResult>(iterator: _.MemoIterator<T, TResult>, memo: TResult, context?: any): TResult;

	/**
	* @see _.reduceRight
	**/
	foldr<TResult>(iterator: _.MemoIterator<T, TResult>, memo: TResult, context?: any): TResult;

	/**
	* Wrapped type `any[]`.
	* @see _.find
	**/
	find(iterator: _.ListIterator<T, boolean>, context?: any): T;

	/**
	* @see _.find
	**/
	detect(iterator: _.ListIterator<T, boolean>, context?: any): T;

	/**
	* Wrapped type `any[]`.
	* @see _.filter
	**/
	filter(iterator: _.ListIterator<T, boolean>, context?: any): T[];

	/**
	* @see _.filter
	**/
	select(iterator: _.ListIterator<T, boolean>, context?: any): T[];

	/**
	* Wrapped type `any[]`.
	* @see _.where
	**/
	where<U extends {}>(properties: U): T[];

	/**
	* Wrapped type `any[]`.
	* @see _.findWhere
	**/
	findWhere<U extends {}>(properties: U): T;

	/**
	* Wrapped type `any[]`.
	* @see _.reject
	**/
	reject(iterator: _.ListIterator<T, boolean>, context?: any): T[];

	/**
	* Wrapped type `any[]`.
	* @see _.all
	**/
	all(iterator: _.ListIterator<T, boolean>, context?: any): boolean;

	/**
	* @see _.all
	**/
	every(iterator: _.ListIterator<T, boolean>, context?: any): boolean;

	/**
	* Wrapped type `any[]`.
	* @see _.any
	**/
	any(iterator?: _.ListIterator<T, boolean>, context?: any): boolean;

	/**
	* @see _.any
	**/
	some(iterator?: _.ListIterator<T, boolean>, context?: any): boolean;

	/**
	* Wrapped type `any[]`.
	* @see _.contains
	**/
	contains(value: T): boolean;

	/**
	* Alias for 'contains'.
	* @see contains
	**/
	include(value: T): boolean;

	/**
	* Wrapped type `any[]`.
	* @see _.invoke
	**/
	invoke(methodName: string, ...arguments: any[]): any;

	/**
	* Wrapped type `any[]`.
	* @see _.pluck
	**/
	pluck(propertyName: string): any[];

	/**
	* Wrapped type `number[]`.
	* @see _.max
	**/
	max(): number;

	/**
	* Wrapped type `any[]`.
	* @see _.max
	**/
	max(iterator: _.ListIterator<T, number>, context?: any): T;

	/**
	* Wrapped type `any[]`.
	* @see _.max
	**/
	max(iterator?: _.ListIterator<T, any>, context?: any): T;

	/**
	* Wrapped type `number[]`.
	* @see _.min
	**/
	min(): number;

	/**
	* Wrapped type `any[]`.
	* @see _.min
	**/
	min(iterator: _.ListIterator<T, number>, context?: any): T;

	/**
	* Wrapped type `any[]`.
	* @see _.min
	**/
	min(iterator?: _.ListIterator<T, any>, context?: any): T;

	/**
	* Wrapped type `any[]`.
	* @see _.sortBy
	**/
	sortBy(iterator?: _.ListIterator<T, any>, context?: any): T[];

	/**
	* Wrapped type `any[]`.
	* @see _.sortBy
	**/
	sortBy(iterator: string, context?: any): T[];

	/**
	* Wrapped type `any[]`.
	* @see _.groupBy
	**/
	groupBy(iterator?: _.ListIterator<T, any>, context?: any): _.Dictionary<_.List<T>>;

	/**
	* Wrapped type `any[]`.
	* @see _.groupBy
	**/
	groupBy(iterator: string, context?: any): _.Dictionary<T[]>;

	/**
	* Wrapped type `any[]`.
	* @see _.countBy
	**/
	countBy(iterator?: _.ListIterator<T, any>, context?: any): _.Dictionary<number[]>;

	/**
	* Wrapped type `any[]`.
	* @see _.countBy
	**/
	countBy(iterator: string, context?: any): _.Dictionary<number[]>;

	/**
	* Wrapped type `any[]`.
	* @see _.shuffle
	**/
	shuffle(): T[];

	/**
	* Wrapped type `any`.
	* @see _.toArray
	**/
	toArray(): T[];

	/**
	* Wrapped type `any`.
	* @see _.size
	**/
	size(): number;

	/*********
	* Arrays *
	**********/

	/**
	* Wrapped type `any[]`.
	* @see _.first
	**/
	first(): T;

	/**
	* Wrapped type `any[]`.
	* @see _.first
	**/
	first(n: number): T[];

	/**
	* @see _.first
	**/
	head(): T;

	/**
	* @see _.first
	**/
	head(n: number): T[];

	/**
	* @see _.first
	**/
	take(): T;

	/**
	* @see _.first
	**/
	take(n: number): T[];

	/**
	* Wrapped type `any[]`.
	* @see _.initial
	**/
	initial(n?: number): T[];

	/**
	* Wrapped type `any[]`.
	* @see _.last
	**/
	last(): T;

	/**
	* Wrapped type `any[]`.
	* @see _.last
	**/
	last(n: number): T[];

	/**
	* Wrapped type `any[]`.
	* @see _.rest
	**/
	rest(n?: number): T[];

	/**
	* @see _.rest
	**/
	tail(n?: number): T[];

	/**
	* @see _.rest
	**/
	drop(n?: number): T[];

	/**
	* Wrapped type `any[]`.
	* @see _.compact
	**/
	compact(): T[];

	/**
	* Wrapped type `any`.
	* @see _.flatten
	**/
	flatten(shallow?: boolean): any[];

	/**
	* Wrapped type `any[]`.
	* @see _.without
	**/
	without(...values: T[]): T[];

	/**
	* Wrapped type `any[][]`.
	* @see _.union
	**/
	union(...arrays: _.List<T>[]): T[];

	/**
	* Wrapped type `any[][]`.
	* @see _.intersection
	**/
	intersection(...arrays: _.List<T>[]): T[];

	/**
	* Wrapped type `any[]`.
	* @see _.difference
	**/
	difference(...others: _.List<T>[]): T[];

	/**
	* Wrapped type `any[]`.
	* @see _.uniq
	**/
	uniq(isSorted?: boolean, iterator?: _.ListIterator<T, any>): T[];

	/**
	* Wrapped type `any[]`.
	* @see _.uniq
	**/
	uniq<TSort>(iterator?: _.ListIterator<T, TSort>, context?: any): T[];

	/**
	* @see _.uniq
	**/
	unique<TSort>(isSorted?: boolean, iterator?: _.ListIterator<T, TSort>): T[];

	/**
	* @see _.uniq
	**/
	unique<TSort>(iterator?: _.ListIterator<T, TSort>, context?: any): T[];

	/**
	* Wrapped type `any[][]`.
	* @see _.zip
	**/
	zip(...arrays: any[][]): any[][];

	/**
	* Wrapped type `any[][]`.
	* @see _.object
	**/
	object(...keyValuePairs: any[][]): any;

	/**
	* @see _.object
	**/
	object(values?: any): any;

	/**
	* Wrapped type `any[]`.
	* @see _.indexOf
	**/
	indexOf(value: T, isSorted?: boolean): number;

	/**
	* @see _.indexOf
	**/
	indexOf(value: T, startFrom: number): number;

	/**
	* Wrapped type `any[]`.
	* @see _.lastIndexOf
	**/
	lastIndexOf(value: T, from?: number): number;

	/**
	* Wrapped type `any[]`.
	* @see _.sortedIndex
	**/
	sortedIndex(value: T, iterator?: (x: T) => any, context?: any): number;

	/**
	* Wrapped type `number`.
	* @see _.range
	**/
	range(stop: number, step?: number): number[];

	/**
	* Wrapped type `number`.
	* @see _.range
	**/
	range(): number[];

	/* ***********
	 * Functions *
	************ */

	/**
	* Wrapped type `Function`.
	* @see _.bind
	**/
	bind(object: any, ...arguments: any[]): Function;

	/**
	* Wrapped type `object`.
	* @see _.bindAll
	**/
	bindAll(...methodNames: string[]): any;

	/**
	* Wrapped type `Function`.
	* @see _.partial
	**/
	partial(...arguments: any[]): Function;

	/**
	* Wrapped type `Function`.
	* @see _.memoize
	**/
	memoize(hashFn?: (n: any) => string): Function;

	/**
	* Wrapped type `Function`.
	* @see _.defer
	**/
	defer(...arguments: any[]): void;

	/**
	* Wrapped type `Function`.
	* @see _.delay
	**/
	delay(wait: number, ...arguments: any[]): any;

	/**
	* @see _.delay
	**/
	delay(...arguments: any[]): any;

	/**
	* Wrapped type `Function`.
	* @see _.throttle
	**/
	throttle(wait: number): Function;

	/**
	* Wrapped type `Function`.
	* @see _.debounce
	**/
	debounce(wait: number, immediate?: boolean): Function;

	/**
	* Wrapped type `Function`.
	* @see _.once
	**/
	once(): Function;

	/**
	* Wrapped type `number`.
	* @see _.after
	**/
	after(func: Function): Function;

	/**
	* Wrapped type `Function`.
	* @see _.wrap
	**/
	wrap(wrapper: Function): () => Function;

	/**
	* Wrapped type `Function[]`.
	* @see _.compose
	**/
	compose(...functions: Function[]): Function;

	/********* *
	 * Objects *
	********** */

	/**
	* Wrapped type `object`.
	* @see _.keys
	**/
	keys(): string[];

	/**
	* Wrapped type `object`.
	* @see _.values
	**/
	values(): T[];

	/**
	* Wrapped type `object`.
	* @see _.pairs
	**/
	pairs(): any[][];

	/**
	* Wrapped type `object`.
	* @see _.invert
	**/
	invert(): any;

	/**
	* Wrapped type `object`.
	* @see _.functions
	**/
	functions(): string[];

	/**
	* @see _.functions
	**/
	methods(): string[];

	/**
	* Wrapped type `object`.
	* @see _.extend
	**/
	extend(...sources: any[]): any;

	/**
	* Wrapped type `object`.
	* @see _.pick
	**/
	pick(...keys: string[]): any;
	pick(keys: string[]): any;

	/**
	* Wrapped type `object`.
	* @see _.omit
	**/
	omit(...keys: string[]): any;
	omit(keys: string[]): any;

	/**
	* Wrapped type `object`.
	* @see _.defaults
	**/
	defaults(...defaults: any[]): any;

	/**
	* Wrapped type `any[]`.
	* @see _.clone
	**/
	clone(): T;

	/**
	* Wrapped type `object`.
	* @see _.tap
	**/
	tap(interceptor: (...as: any[]) => any): any;

	/**
	* Wrapped type `object`.
	* @see _.has
	**/
	has(key: string): boolean;

	/**
	* Wrapped type `object`.
	* @see _.isEqual
	**/
	isEqual(other: any): boolean;

	/**
	* Wrapped type `object`.
	* @see _.isEmpty
	**/
	isEmpty(): boolean;

	/**
	* Wrapped type `object`.
	* @see _.isElement
	**/
	isElement(): boolean;

	/**
	* Wrapped type `object`.
	* @see _.isArray
	**/
	isArray(): boolean;

	/**
	* Wrapped type `object`.
	* @see _.isObject
	**/
	isObject(): boolean;

	/**
	* Wrapped type `object`.
	* @see _.isArguments
	**/
	isArguments(): boolean;

	/**
	* Wrapped type `object`.
	* @see _.isFunction
	**/
	isFunction(): boolean;

	/**
	* Wrapped type `object`.
	* @see _.isString
	**/
	isString(): boolean;

	/**
	* Wrapped type `object`.
	* @see _.isNumber
	**/
	isNumber(): boolean;

	/**
	* Wrapped type `object`.
	* @see _.isFinite
	**/
	isFinite(): boolean;

	/**
	* Wrapped type `object`.
	* @see _.isBoolean
	**/
	isBoolean(): boolean;

	/**
	* Wrapped type `object`.
	* @see _.isDate
	**/
	isDate(): boolean;

	/**
	* Wrapped type `object`.
	* @see _.isRegExp
	**/
	isRegExp(): boolean;

	/**
	* Wrapped type `object`.
	* @see _.isNaN
	**/
	isNaN(): boolean;

	/**
	* Wrapped type `object`.
	* @see _.isNull
	**/
	isNull(): boolean;

	/**
	* Wrapped type `object`.
	* @see _.isUndefined
	**/
	isUndefined(): boolean;

	/********* *
	 * Utility *
	********** */

	/**
	* Wrapped type `any`.
	* @see _.identity
	**/
	identity(): any;

	/**
	* Wrapped type `number`.
	* @see _.times
	**/
	times<TResult>(iterator: (n: number) => TResult, context?: any): TResult[];

	/**
	* Wrapped type `number`.
	* @see _.random
	**/
	random(): number;
	/**
	* Wrapped type `number`.
	* @see _.random
	**/
	random(max: number): number;

	/**
	* Wrapped type `object`.
	* @see _.mixin
	**/
	mixin(): void;

	/**
	* Wrapped type `string`.
	* @see _.uniqueId
	**/
	uniqueId(): string;

	/**
	* Wrapped type `string`.
	* @see _.escape
	**/
	escape(): string;

	/**
	* Wrapped type `object`.
	* @see _.result
	**/
	result(property: string): any;

	/**
	* Wrapped type `string`.
	* @see _.template
	**/
	template(data?: any, settings?: _.TemplateSettings): (...data: any[]) => string;

	/********** *
	 * Chaining *
	*********** */

	/**
	* Wrapped type `any`.
	* @see _.chain
	**/
	chain(): _Chain<any>;

	/**
	* Wrapped type `any`.
	* @see _.value
	**/
	value<TResult>(): TResult;
}

interface _Chain<T> {

	/* *************
	 * Collections *
	 ************* */

	/**
	* Wrapped type `any[]`.
	* @see _.each
	**/
	each(iterator: _.ListIterator<T, void >, context?: any): _Chain<any>;

	/**
	* @see _.each
	**/
	each(iterator: _.ObjectIterator<T, void >, context?: any): _Chain;

	/**
	* @see _.each
	**/
	forEach(iterator: _.ListIterator<T, void >, context?: any): _Chain;

	/**
	* @see _.each
	**/
	forEach(iterator: _.ObjectIterator<T, void >, context?: any): _Chain;

	/**
	* Wrapped type `any[]`.
	* @see _.map
	**/
	map<TResult>(iterator: _.ListIterator<T, TResult>, context?: any): _Chain;

	/**
	* Wrapped type `any[]`.
	* @see _.map
	**/
	map<TResult>(iterator: _.ObjectIterator<T, TResult>, context?: any): _Chain;

	/**
	* @see _.map
	**/
	collect<TResult>(iterator: _.ListIterator<T, TResult>, context?: any): _Chain;

	/**
	* @see _.map
	**/
	collect<TResult>(iterator: _.ObjectIterator<T, TResult>, context?: any): _Chain;

	/**
	* Wrapped type `any[]`.
	* @see _.reduce
	**/
	reduce<TResult>(iterator: _.MemoIterator<T, TResult>, memo: TResult, context?: any): _Chain;

	/**
	* @see _.reduce
	**/
	inject<TResult>(iterator: _.MemoIterator<T, TResult>, memo: TResult, context?: any): _Chain;

	/**
	* @see _.reduce
	**/
	foldl<TResult>(iterator: _.MemoIterator<T, TResult>, memo: TResult, context?: any): _Chain;

	/**
	* Wrapped type `any[]`.
	* @see _.reduceRight
	**/
	reduceRight<TResult>(iterator: _.MemoIterator<T, TResult>, memo: TResult, context?: any): _Chain;

	/**
	* @see _.reduceRight
	**/
	foldr<TResult>(iterator: _.MemoIterator<T, TResult>, memo: TResult, context?: any): _Chain;

	/**
	* Wrapped type `any[]`.
	* @see _.find
	**/
	find(iterator: _.ListIterator<T, boolean>, context?: any): _Chain;

	/**
	* @see _.find
	**/
	detect(iterator: _.ListIterator<T, boolean>, context?: any): _Chain;

	/**
	* Wrapped type `any[]`.
	* @see _.filter
	**/
	filter(iterator: _.ListIterator<T, boolean>, context?: any): _Chain;

	/**
	* @see _.filter
	**/
	select(iterator: _.ListIterator<T, boolean>, context?: any): _Chain;

	/**
	* Wrapped type `any[]`.
	* @see _.where
	**/
	where<U extends {}>(properties: U): _Chain;

	/**
	* Wrapped type `any[]`.
	* @see _.findWhere
	**/
	findWhere<U extends {}>(properties: U): _Chain;

	/**
	* Wrapped type `any[]`.
	* @see _.reject
	**/
	reject(iterator: _.ListIterator<T, boolean>, context?: any): _Chain;

	/**
	* Wrapped type `any[]`.
	* @see _.all
	**/
	all(iterator: _.ListIterator<T, boolean>, context?: any): _Chain;

	/**
	* @see _.all
	**/
	every(iterator: _.ListIterator<T, boolean>, context?: any): _Chain;

	/**
	* Wrapped type `any[]`.
	* @see _.any
	**/
	any(iterator?: _.ListIterator<T, boolean>, context?: any): _Chain;

	/**
	* @see _.any
	**/
	some(iterator?: _.ListIterator<T, boolean>, context?: any): _Chain;

	/**
	* Wrapped type `any[]`.
	* @see _.contains
	**/
	contains(value: T): _Chain;

	/**
	* Alias for 'contains'.
	* @see contains
	**/
	include(value: T): _Chain;

	/**
	* Wrapped type `any[]`.
	* @see _.invoke
	**/
	invoke(methodName: string, ...arguments: any[]): _Chain;

	/**
	* Wrapped type `any[]`.
	* @see _.pluck
	**/
	pluck(propertyName: string): _Chain;

	/**
	* Wrapped type `number[]`.
	* @see _.max
	**/
	max(): _Chain;

	/**
	* Wrapped type `any[]`.
	* @see _.max
	**/
	max(iterator: _.ListIterator<T, number>, context?: any): _Chain;

	/**
	* Wrapped type `any[]`.
	* @see _.max
	**/
	max(iterator?: _.ListIterator<T, any>, context?: any): _Chain;

	/**
	* Wrapped type `number[]`.
	* @see _.min
	**/
	min(): _Chain;

	/**
	* Wrapped type `any[]`.
	* @see _.min
	**/
	min(iterator: _.ListIterator<T, number>, context?: any): _Chain;

	/**
	* Wrapped type `any[]`.
	* @see _.min
	**/
	min(iterator?: _.ListIterator<T, any>, context?: any): _Chain;

	/**
	* Wrapped type `any[]`.
	* @see _.sortBy
	**/
	sortBy(iterator?: _.ListIterator<T, any>, context?: any): _Chain;

	/**
	* Wrapped type `any[]`.
	* @see _.sortBy
	**/
	sortBy(iterator: string, context?: any): _Chain;

	/**
	* Wrapped type `any[]`.
	* @see _.groupBy
	**/
	groupBy(iterator?: _.ListIterator<T, any>, context?: any): _Chain;

	/**
	* Wrapped type `any[]`.
	* @see _.groupBy
	**/
	groupBy(iterator: string, context?: any): _Chain;

	/**
	* Wrapped type `any[]`.
	* @see _.countBy
	**/
	countBy(iterator?: _.ListIterator<T, any>, context?: any): _Chain;

	/**
	* Wrapped type `any[]`.
	* @see _.countBy
	**/
	countBy(iterator: string, context?: any): _Chain;

	/**
	* Wrapped type `any[]`.
	* @see _.shuffle
	**/
	shuffle(): _Chain;

	/**
	* Wrapped type `any`.
	* @see _.toArray
	**/
	toArray(): _Chain;

	/**
	* Wrapped type `any`.
	* @see _.size
	**/
	size(): _Chain;

	/*********
	* Arrays *
	**********/

	/**
	* Wrapped type `any[]`.
	* @see _.first
	**/
	first(): _Chain;

	/**
	* Wrapped type `any[]`.
	* @see _.first
	**/
	first(n: number): _Chain;

	/**
	* @see _.first
	**/
	head(): _Chain;

	/**
	* @see _.first
	**/
	head(n: number): _Chain;

	/**
	* @see _.first
	**/
	take(): _Chain;

	/**
	* @see _.first
	**/
	take(n: number): _Chain;

	/**
	* Wrapped type `any[]`.
	* @see _.initial
	**/
	initial(n?: number): _Chain;

	/**
	* Wrapped type `any[]`.
	* @see _.last
	**/
	last(): _Chain;

	/**
	* Wrapped type `any[]`.
	* @see _.last
	**/
	last(n: number): _Chain;

	/**
	* Wrapped type `any[]`.
	* @see _.rest
	**/
	rest(n?: number): _Chain;

	/**
	* @see _.rest
	**/
	tail(n?: number): _Chain;

	/**
	* @see _.rest
	**/
	drop(n?: number): _Chain;

	/**
	* Wrapped type `any[]`.
	* @see _.compact
	**/
	compact(): _Chain;

	/**
	* Wrapped type `any`.
	* @see _.flatten
	**/
	flatten(shallow?: boolean): _Chain;

	/**
	* Wrapped type `any[]`.
	* @see _.without
	**/
	without(...values: T[]): _Chain;

	/**
	* Wrapped type `any[][]`.
	* @see _.union
	**/
	union(...arrays: _.List<T>[]): _Chain;

	/**
	* Wrapped type `any[][]`.
	* @see _.intersection
	**/
	intersection(...arrays: _.List<T>[]): _Chain;

	/**
	* Wrapped type `any[]`.
	* @see _.difference
	**/
	difference(...others: _.List<T>[]): _Chain;

	/**
	* Wrapped type `any[]`.
	* @see _.uniq
	**/
	uniq(isSorted?: boolean, iterator?: _.ListIterator<T, any>): _Chain;

	/**
	* Wrapped type `any[]`.
	* @see _.uniq
	**/
	uniq<TSort>(iterator?: _.ListIterator<T, TSort>, context?: any): _Chain;

	/**
	* @see _.uniq
	**/
	unique<TSort>(isSorted?: boolean, iterator?: _.ListIterator<T, TSort>): _Chain;

	/**
	* @see _.uniq
	**/
	unique<TSort>(iterator?: _.ListIterator<T, TSort>, context?: any): _Chain;

	/**
	* Wrapped type `any[][]`.
	* @see _.zip
	**/
	zip(...arrays: any[][]): _Chain;

	/**
	* Wrapped type `any[][]`.
	* @see _.object
	**/
	object(...keyValuePairs: any[][]): _Chain;

	/**
	* @see _.object
	**/
	object(values?: any): _Chain;

	/**
	* Wrapped type `any[]`.
	* @see _.indexOf
	**/
	indexOf(value: T, isSorted?: boolean): _Chain;

	/**
	* @see _.indexOf
	**/
	indexOf(value: T, startFrom: number): _Chain;

	/**
	* Wrapped type `any[]`.
	* @see _.lastIndexOf
	**/
	lastIndexOf(value: T, from?: number): _Chain;

	/**
	* Wrapped type `any[]`.
	* @see _.sortedIndex
	**/
	sortedIndex(value: T, iterator?: (x: T) => any, context?: any): _Chain;

	/**
	* Wrapped type `number`.
	* @see _.range
	**/
	range(stop: number, step?: number): _Chain;

	/**
	* Wrapped type `number`.
	* @see _.range
	**/
	range(): _Chain;

	/* ***********
	 * Functions *
	************ */

	/**
	* Wrapped type `Function`.
	* @see _.bind
	**/
	bind(object: any, ...arguments: any[]): _Chain;

	/**
	* Wrapped type `object`.
	* @see _.bindAll
	**/
	bindAll(...methodNames: string[]): _Chain;

	/**
	* Wrapped type `Function`.
	* @see _.partial
	**/
	partial(...arguments: any[]): _Chain;

	/**
	* Wrapped type `Function`.
	* @see _.memoize
	**/
	memoize(hashFn?: (n: any) => string): _Chain;

	/**
	* Wrapped type `Function`.
	* @see _.defer
	**/
	defer(...arguments: any[]): _Chain;

	/**
	* Wrapped type `Function`.
	* @see _.delay
	**/
	delay(wait: number, ...arguments: any[]): _Chain;

	/**
	* @see _.delay
	**/
	delay(...arguments: any[]): _Chain;

	/**
	* Wrapped type `Function`.
	* @see _.throttle
	**/
	throttle(wait: number): _Chain;

	/**
	* Wrapped type `Function`.
	* @see _.debounce
	**/
	debounce(wait: number, immediate?: boolean): _Chain;

	/**
	* Wrapped type `Function`.
	* @see _.once
	**/
	once(): _Chain;

	/**
	* Wrapped type `number`.
	* @see _.after
	**/
	after(func: Function): _Chain;

	/**
	* Wrapped type `Function`.
	* @see _.wrap
	**/
	wrap(wrapper: Function): () => _Chain;

	/**
	* Wrapped type `Function[]`.
	* @see _.compose
	**/
	compose(...functions: Function[]): _Chain;

	/********* *
	 * Objects *
	********** */

	/**
	* Wrapped type `object`.
	* @see _.keys
	**/
	keys(): _Chain;

	/**
	* Wrapped type `object`.
	* @see _.values
	**/
	values(): _Chain;

	/**
	* Wrapped type `object`.
	* @see _.pairs
	**/
	pairs(): _Chain;

	/**
	* Wrapped type `object`.
	* @see _.invert
	**/
	invert(): _Chain;

	/**
	* Wrapped type `object`.
	* @see _.functions
	**/
	functions(): _Chain;

	/**
	* @see _.functions
	**/
	methods(): _Chain;

	/**
	* Wrapped type `object`.
	* @see _.extend
	**/
	extend(...sources: any[]): _Chain;

	/**
	* Wrapped type `object`.
	* @see _.pick
	**/
	pick(...keys: string[]): _Chain;

	/**
	* Wrapped type `object`.
	* @see _.omit
	**/
	omit(...keys: string[]): _Chain;

	/**
	* Wrapped type `object`.
	* @see _.defaults
	**/
	defaults(...defaults: any[]): _Chain;

	/**
	* Wrapped type `any[]`.
	* @see _.clone
	**/
	clone(): _Chain;

	/**
	* Wrapped type `object`.
	* @see _.tap
	**/
	tap(interceptor: (...as: any[]) => any): _Chain;

	/**
	* Wrapped type `object`.
	* @see _.has
	**/
	has(key: string): _Chain;

	/**
	* Wrapped type `object`.
	* @see _.isEqual
	**/
	isEqual(other: any): _Chain;

	/**
	* Wrapped type `object`.
	* @see _.isEmpty
	**/
	isEmpty(): _Chain;

	/**
	* Wrapped type `object`.
	* @see _.isElement
	**/
	isElement(): _Chain;

	/**
	* Wrapped type `object`.
	* @see _.isArray
	**/
	isArray(): _Chain;

	/**
	* Wrapped type `object`.
	* @see _.isObject
	**/
	isObject(): _Chain;

	/**
	* Wrapped type `object`.
	* @see _.isArguments
	**/
	isArguments(): _Chain;

	/**
	* Wrapped type `object`.
	* @see _.isFunction
	**/
	isFunction(): _Chain;

	/**
	* Wrapped type `object`.
	* @see _.isString
	**/
	isString(): _Chain;

	/**
	* Wrapped type `object`.
	* @see _.isNumber
	**/
	isNumber(): _Chain;

	/**
	* Wrapped type `object`.
	* @see _.isFinite
	**/
	isFinite(): _Chain;

	/**
	* Wrapped type `object`.
	* @see _.isBoolean
	**/
	isBoolean(): _Chain;

	/**
	* Wrapped type `object`.
	* @see _.isDate
	**/
	isDate(): _Chain;

	/**
	* Wrapped type `object`.
	* @see _.isRegExp
	**/
	isRegExp(): _Chain;

	/**
	* Wrapped type `object`.
	* @see _.isNaN
	**/
	isNaN(): _Chain;

	/**
	* Wrapped type `object`.
	* @see _.isNull
	**/
	isNull(): _Chain;

	/**
	* Wrapped type `object`.
	* @see _.isUndefined
	**/
	isUndefined(): _Chain;

	/********* *
	 * Utility *
	********** */

	/**
	* Wrapped type `any`.
	* @see _.identity
	**/
	identity(): _Chain;

	/**
	* Wrapped type `number`.
	* @see _.times
	**/
	times<TResult>(iterator: (n: number) => TResult, context?: any): _Chain;

	/**
	* Wrapped type `number`.
	* @see _.random
	**/
	random(): _Chain;
	/**
	* Wrapped type `number`.
	* @see _.random
	**/
	random(max: number): _Chain;

	/**
	* Wrapped type `object`.
	* @see _.mixin
	**/
	mixin(): _Chain;

	/**
	* Wrapped type `string`.
	* @see _.uniqueId
	**/
	uniqueId(): _Chain;

	/**
	* Wrapped type `string`.
	* @see _.escape
	**/
	escape(): _Chain;

	/**
	* Wrapped type `object`.
	* @see _.result
	**/
	result(property: string): _Chain;

	/**
	* Wrapped type `string`.
	* @see _.template
	**/
	template(data?: any, settings?: _.TemplateSettings): (...data: any[]) => _Chain;

	/********** *
	 * Chaining *
	*********** */

	/**
	* Wrapped type `any`.
	* @see _.chain
	**/
	chain(): _Chain;

	/**
	* Wrapped type `any`.
	* @see _.value
	**/
	value<TResult>(): TResult;
}

declare module "underscore" {
	export = _;
}
