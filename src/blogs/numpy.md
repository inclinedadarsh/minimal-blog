---
title: "Getting started with NumPy & NumPy Arrays"
seoTitle: "Getting started with NumPy & NumPy Arrays"
seoDescription: "Learn how arrays work in NumPy Python Library and how to use them. Explore most common functions in NumPy arrays and learn how to use them as well."
datePublished: 2023-01-24
---

We'll go through the fundamentals of NumPy arrays and other operations that relate to them in this blog. If you work in machine learning, you'll utilize these concepts frequently.

## Why learn NumPy?

Every machine learning engineer uses the open-source Python package NumPy, sometimes referred to as Numerical Python, daily. Learning NumPy is a no-brainer because other significant ML libraries like Pandas, Scikit Learn, and Matplotlib are built on top of it.

When compared to normal Python lists, NumPy's 1D, 2D, and n-dimensional arrays and matrices are incredibly memory- and time-efficient. We will talk about these points in a further section. In addition, NumPy arrays include many really helpful features and operations that make our lives simpler every day.

The documentation for NumPy is very well written, and not many people bring it up. Because it is so clearly stated, learning and using NumPy are both quite simple. [Click here](https://numpy.org/doc/stable/) to view the official NumPy documentation.

## Getting started with NumPy

**Conda** or **pip** may be used to install the Numpy library. Again, you can obtain a pretty decent installation tutorial for NumPy from the [official documentation](https://numpy.org/install/).

### Installation

#### Installing NumPy using Conda

To install NumPy from **conda**, you can use the following command in your terminal/command prompt.

```bash
conda install --name environment_name numpy
```

> NOTE: Replace `environment_name` with the name of the environment you want to install NumPy in.

#### Installing NumPy using pip

To install NumPy from **pip**, you can use the following command in your terminal/command prompt.

```bash
pip install numpy
```

### Importing NumPy

The NumPy library may be imported with the utmost simplicity. You just need to use the Python code below at the beginning of the Python file (or at the top if you are using jupyter notebooks)

```python
import numpy as np
```

Importing the Numpy library as `np` is a naming convention largely used and hence I recommend you do the same as well.

## NumPy Array

Arrays in NumPy are pretty similar to lists in Python but superior.

### Difference between Python List & NumPy Array

NumPy arrays a group of homogeneous elements. That means a NumPy array cannot have elements of different data types. While in the case of lists, they can have elements of more than one data type. Now as NumPy arrays have homogeneous elements, the operations performed on them are much more memory-efficient and time-efficient.

#### Time Comparison

Let's see how NumPy is faster than a regular Python list. Please note that the screenshot given is from a Jupyter Notebook.

![Time comparison screen shot](https://cdn.hashnode.com/res/hashnode/image/upload/v1674571521310/b65d898b-e19d-430e-a56a-581439d1215b.png)

As you can see, while creating a regular Python list, the time taken is 42.2 milliseconds while creating a NumPy array of the same size, the time taken is only 1.9 milliseconds which is only 4.5% of the time taken to create the Python list. This difference keeps on increasing when we go with bigger size of arrays.

Now let's see the time difference while performing a simple operation on both, lists and arrays.

![Time comparison screen shot](https://cdn.hashnode.com/res/hashnode/image/upload/v1674572211140/d23c7acb-416c-40ef-9e09-55d54dcfd8ad.png)

As you can see, while multiplying each element of a regular Python list by 2, the time taken is 230 milliseconds and while performing the same operation on a Python list, the time taken is only 10.2 milliseconds which is again only about 4% of the time taken by the Python list.

Hence, we can easily say that a NumPy array is much more time-efficient than a regular Python list.

#### Memory Comparison

In a regular Python list, each element takes 24-bit memory, which is because each element in a NumPy array takes only 8-bit memory, and this makes NumPy arrays around 66% smaller in size while giving scope to much more operations and functions.

Additionally, Numpy offers many operations that help NumPy arrays be useful. In the next section, we'll look at several frequent and significant operations, but first, let's look at how to create a NumPy array.

### Creating NumPy Array

We are going to assume that we have imported Numpy as `np` above all the code we are going to write.

#### Creating an array using a list

An extremely popular method of building an array is by utilizing a Python list to create a NumPy array. The following Python code may be used to convert Python lists into NumPy arrays.

```python
my_list = [3, 2, 5, 66]
np.array(my_list)
// array([3, 2, 5, 66])
```

We have created a NumPy array using the `my_list` python list.

> Please note that we have not stored the created array in any variable.

We can also directly pass a list in `np.array()` method to make a NumPy array.

```python
np.array([3, 2, 5, 66])
// array([3, 2, 5, 66])
```

We can also make a multidimensional NumPy array in addition to this. One of Numpy's finest features is that it writes multidimensional arrays automatically in matrix form when printed.

```python
np.array([[3, 4, 2], [1, 4, 5]])
// array([[3 4 2]
//        [1 4 5]])
```

#### Creating an array using numpy methods

With the help of the `np.arange()` method, an array may be made. In the case of a single parameter, an array of all the integers from 0 to that number excluding it is returned.

```python
np.arange(5)
// array([0, 1, 2, 3, 4])
```

Typically, the `np.arange()` function can take up to three parameters. The first is the starting point, the second is the excluded endpoint, and the third is the step size. `np.arange(startpoint (included), endpoint (not included), stepSize)` is a general function.

```python
np.arange(1, 11, 2)
// array([1, 3, 5, 7, 9])
```

Other methods are also available, such as `np.zeros()` and `np.ones()`, which allows us to build arrays with just 0 or 1 entries, respectively.

```python
np.ones(5)
// array([1., 1., 1., 1., 1.])

np.zeros(5)
// array([0., 0., 0., 0., 0.])
```

In these methods, we may additionally give a tuple as an input that specifies the desired matrix dimensions.

```python
np.ones((3, 2))
// array([[1., 1.],
//        [1., 1.],
//        [1., 1.]])
```

> Note that when generating an array using such functions, the items appear to have a point `.` at the end. The reason for this is that NumPy tries to save them as floating point integers so that any operations on them may be correct. If you need to define the data type to use to store these pieces, have a look at the `dtype` parameter.

### Working with NumPy Arrays (Array Operations)

If you have two arrays, you can concatenate them with the `np.concatenate()` function.

```python
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

np.concatenate(a, b)
// array([1, 2, 3, 4, 5, 6])
```

You can know about a NumPy array with the help of attributes such as `array.shape` to know the shape, `array.ndim` to know the number of dimensions and `array.size` to know the number of elements in the array/matrix.

```python
a = np.array([[1, 2, 3], [4, 5, 6]])

a.shape
// (3, 2)

a.ndim
// 2

a.size
// 6
```

The `array.reshape()` function can be used to reshape a NumPy matrix. A 1D array of that many items will be created if only a single integer is provided as input. If a tuple of integers is provided, the array will be changed into the desired shape. Make sure the dimensions provided satisfies the shape

```python
a = np.array([[1, 2, 3], [4, 5, 6]])

a.reshape((2, 3))
// array([[1, 2],
//        [3, 4],
//        [5, 6]])
```

### Retrieving data from an array

Slicing and indexing on NumPy arrays are quite similar to slicing and indexing on lists.

```python
a = np.array([3, 4, 1, 55, 23])

a[2]
// 1

a[1:4]
// array([4, 1, 55])

a[:]
// array([3, 4, 1, 55, 23])
```

Slicing and indexing also work on multi-dimensional arrays.

```python
a = np.array([[1, 7, 3], [0, 12, 6], [1, 45, 9]])

a[1]
// array([0, 12, 6])

a[2][0]
// 1

a[:]
// array([[1,  7, 3],
//        [0, 12, 6],
          [1, 45, 9]])
```

### Conditional Formatting

A significant and extremely helpful feature of NumPy arrays is conditional formatting. We'll break it down into three phases because it can be a bit difficult to comprehend at first.

1. Comparing NumPy array.
    
2. Retrieving data from a NumPy array using an array of boolean values.
    
3. Combining everything.
    

#### Comparing numpy array

Although it may seem odd, you can compare a NumPy array in the same way that you can compare a Python variable. An array with boolean values of the same dimension as the array that was compared is returned when an array is compared to an integer or variable.

```python
a = np.array([[1, 7, 3], [4, 5, 6]])

a >= 5
// array([[False,  True, False],
          [False,  True,  True]])
```

> There, you'll see that boolean values are capitalized. The reason for this is that NumPy's unique boolean values are being used, not Python's built-in boolean values.

#### Retrieving data from a NumPy array using an array of boolean values

We can retrieve data from a NumPy array using an array of boolean values and NumPy will return an array of all the elements that correspond to the same position of `True`.

```python
a = np.array([[1, 7, 3], [4, 5, 6]])

a[array([[False,  True, False], [False,  True,  True]])]
// array([7, 5, 6])
```

In the array of the example above, we are giving a NumPy array of boolean values. If the boolean value at the relevant position is True, NumPy will automatically return the element.

We must confirm that the boolean value array that was supplied has the same dimension as the array whose value we need to retrieve.

#### Combining everything

After doing all this, we can skip the middle step and do one-line conditional formatting.

```python
a = np.array([[1, 7, 3], [4, 5, 6]])

a[a >= 5]
// array([7, 5, 6])
```

We may omit the initial compare step and just send the same returned array once more to get the desired data.

### Broadcasting in NumPy Array

On each member of the array, you could wish to do an operation, such as addition, multiplication, or even a more complex operation. It is made feasible with the use of broadcasting and NumPy arrays.

You can perform any operation between an array and an integer or variable and NumPy will perform that operation on each element of the array and will return a new array with new values.

```python
a = np.array([1, 7, 3])

a * 2
// array([2, 14, 6])
```

Similar to this, you may execute an arithmetic or logical operation between two identically sized arrays, and NumPy will do it by using individual elements in the same location to act and returning a new array containing all the results.

```python
a = np.array([1, 7, 3])
b = np.array([3, 2, 12])

a + b
// array([4, 9, 15])
```

### Other useful array operations

Let's examine a few of the most frequent and practical operations that may be carried out on a NumPy array in the last section.

The array's maximum value is returned via the `array.max()` function. The array's lowest value is returned by the `array.min()` function. The sum of all the elements in the array is returned by the `array.sum()` function.

```python
a = np.array([1, 7, 3])

a.max()
// 7

a.min()
// 1

a.sum()
// 11
```

## Thank You!

### What next?

This was just the basics of NumPy arrays and there's a lot more to it. I would strongly recommend you go to the [official documentation](https://numpy.org/doc/1.24/user/absolute_beginners.html) as it is very well written and you can understand most of the things there only.

### Did you like it?

If you liked this blog then please press that reaction button. Also, if you got some input from the blog then do tag me on Twitter and tweet about it, I will appreciate it.

You can find me on Twitter as inclinedadarsh. You can see the rest of my online presence [here](https://bio.link/inclinedadarsh).

Thank you for reading this blog. This is Adarsh Dubey, signing off.