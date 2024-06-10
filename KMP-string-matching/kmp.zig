const std = @import("std");
const allocator = std.heap.page_allocator;
const print = std.debug.print;

fn kmp(text: []const u8, pattern: []const u8) !?u64 {
    const n = text.len;
    const m = pattern.len;

    if (n <= 0 or m <= 0) return null;

    const fail = try failureLinks(pattern);
    defer allocator.free(fail);

    var i: usize = 0;
    var q: usize = 0;

    while (i < n) {
        if (text[i] == pattern[q]) {
            i += 1;
            q += 1;
            if (q == m) {
                return i - q;
            }
        } else if (q >= 1) {
            q = fail[q];
        } else {
            i += 1;
        }
    }
    return null;
}

pub fn failureLinks(pattern: []const u8) ![]u8 {
    const m = pattern.len;

    const fail = try allocator.alloc(u8, m);
    fail[0] = 0;
    var x: usize = 0;
    for (1..m) |q| {
        fail[q] = @intCast(x);
        while (x > 0 and pattern[x] != pattern[q]) {
            x = fail[x];
        }
        if (pattern[x] == pattern[q]) {
            x += 1;
        }
    }
    return fail;
}

pub fn main() !void {
    const pattern = "anpanman";
    const text = "anpanpanpanman";
    const res = try kmp(text, pattern);
    if (res) |pos| {
        std.debug.print("\n pattern {s} found at position {?}.\n", .{ pattern, pos });
    } else {
        std.debug.print("\n pattern {s} not found\n", .{pattern});
    }
}

test {
    const expect = std.testing.expect;
    const DataPoint = struct {
        text: []const u8,
        pattern: []const u8,
        expectedIndex: ?u64,
    };
    const TestData = [_]DataPoint{
        .{ .text = "anpanpanpanman", .pattern = "anpanman", .expectedIndex = 6 },
        .{ .text = "abcdefg", .pattern = "cde", .expectedIndex = 2 },
        .{ .text = "hello world", .pattern = "world", .expectedIndex = 6 },
        .{ .text = "banana", .pattern = "apple", .expectedIndex = null },
        .{ .text = "mississippi", .pattern = "issi", .expectedIndex = 1 },
        .{ .text = "foobarbaz", .pattern = "bar", .expectedIndex = 3 },
        .{ .text = "abcabcabc", .pattern = "abc", .expectedIndex = 0 },
        .{ .text = "abcdefg", .pattern = "cde", .expectedIndex = 2 },
        .{ .text = "hello world", .pattern = "world", .expectedIndex = 6 },
        .{ .text = "banana", .pattern = "apple", .expectedIndex = null },
        .{ .text = "mississippi", .pattern = "issi", .expectedIndex = 1 },
        .{ .text = "foobarbaz", .pattern = "bar", .expectedIndex = 3 },
        .{ .text = "abcabcabc", .pattern = "abc", .expectedIndex = 0 },
        .{ .text = "abcdefgh", .pattern = "abcdefgh", .expectedIndex = 0 },
        .{ .text = "xyz", .pattern = "xyz", .expectedIndex = 0 },
        .{ .text = "foo", .pattern = "foo", .expectedIndex = 0 },
        .{ .text = "bar", .pattern = "baz", .expectedIndex = null },
        .{ .text = "a", .pattern = "a", .expectedIndex = 0 },
        .{ .text = "", .pattern = "pattern", .expectedIndex = null },
        .{ .text = "pattern", .pattern = "", .expectedIndex = null },
        .{ .text = "abcabcabc", .pattern = "bcd", .expectedIndex = null },
        .{ .text = "aabbaabbaabbaabb", .pattern = "aabbaabb", .expectedIndex = 0 },
        .{ .text = "aabbaabbaabbaabb", .pattern = "bb", .expectedIndex = 2 },
        .{ .text = "aabbccddeeffgghhiijjkkllmmnnooppqqrrssttuuvvwwxxyyzz", .pattern = "xxyy", .expectedIndex = 46 },
        .{ .text = "aaaabbaaaaaababaaabaaa", .pattern = "aaa", .expectedIndex = 0 },
        .{ .text = "abcdefghijklmnopqrstuvwxyz", .pattern = "xyz", .expectedIndex = 23 },
    };
    for (TestData) |data| {
        const res = try kmp(data.text, data.pattern);
        try expect(res == data.expectedIndex);
    }
}
