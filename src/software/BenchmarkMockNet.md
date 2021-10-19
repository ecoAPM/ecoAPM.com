Title: BenchmarkMockNet
Category: OSS Tools
Description: Using BenchmarkDotNet to compare .NET mocking library performance

Name: BenchmarkMockNet
Type: .NET
---

Benchmarks are an important part of managing performance, and mocking is an important part of unit testing. Unfortunately, large suites of unit tests that rely heavily on mocking can be quite slow.

BenchmarkMockNet (yes, it's a mouthful) maintains a list of all major active mocking libraries and frameworks in the .NET OSS ecosystem, and benchmarks their performance against a set of common use cases.

You can use the [results](https://github.com/ecoAPM/BenchmarkMockNet/blob/main/Results.md) to help make a more informed decision about which mocking library you want to use for your .NET unit tests.